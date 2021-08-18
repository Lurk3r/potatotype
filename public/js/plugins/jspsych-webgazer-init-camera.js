/**
 * jspsych-webgazer-init-camera
 * Josh de Leeuw
 **/

 jsPsych.plugins["webgazer-init-camera"] = (function () {

  var plugin = {};

  plugin.info = {
    name: 'webgazer-init-camera',
    description: '',
    parameters: {
      instructions: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        default: `
            <p>将您的头放在合适的位置，以便摄像头可以清晰地看到您的眼睛。</p>
            <p>将你的脸放在边框的中心，并直视摄像机。</p>
            <p>在整个实验过程中，尽量保持头部静止是很重要的，因此请花点时间调整您的设置，使其舒适。</p>
            <p>当您整个脸部在框中居中且框为绿色时，您可以单击以继续。</p>`
      },
      button_text: {
        type: jsPsych.plugins.parameterType.STRING,
        default: '继续'
      }
    }
  }

  plugin.trial = function (display_element, trial) {

    var start_time = performance.now();
    var load_time;

    if (!jsPsych.extensions.webgazer.isInitialized()) {
      jsPsych.extensions.webgazer.start().then(function () {
        showTrial();
      }).catch(function () {
        display_element.innerHTML = `<p>由于眼动跟踪器无法启动，实验无法继续.</p>
            <p>这可能是由于技术问题或您未授予页面使用相机的权限。</p>`
      });
    } else {
      showTrial();
    }

    function showTrial() {

      load_time = Math.round(performance.now() - start_time);

      var style = `
        <style id="webgazer-center-style">
          #webgazerVideoContainer { top: 20px !important; left: calc(50% - 160px) !important;}
        </style>
      `
      document.querySelector('head').insertAdjacentHTML('beforeend', style);

      var html = `
        <div id='webgazer-init-container' style='position: relative; width:100vw; height:100vh'>
        </div>`

      display_element.innerHTML = html;

      jsPsych.extensions['webgazer'].showVideo();
      jsPsych.extensions['webgazer'].resume();

      var wg_container = display_element.querySelector('#webgazer-init-container');


      wg_container.innerHTML = `
        <div style='position: absolute; top: max(260px, 40%); left: calc(50% - 400px); width:800px;'>
        ${trial.instructions}
        <button id='jspsych-wg-cont' class='jspsych-btn' disabled>${trial.button_text}</button>
        </div>`

      if(is_face_detect_green()){
        document.querySelector('#jspsych-wg-cont').disabled = false;
      } else {
        var observer = new MutationObserver(face_detect_event_observer);
        observer.observe(document, {
          attributes: true,
          attributeFilter: ['style'],
          subtree: true
        });
      }

      document.querySelector('#jspsych-wg-cont').addEventListener('click', function () {
        if(observer){
          observer.disconnect();
        }
        end_trial();
      });
    }

    function is_face_detect_green(){
      if(document.querySelector("#webgazerFaceFeedbackBox")){
        return document.querySelector('#webgazerFaceFeedbackBox').style.borderColor == "green"
      } else {
        return false;
      }
    }

    function face_detect_event_observer(mutationsList, observer) {
      if (mutationsList[0].target == document.querySelector('#webgazerFaceFeedbackBox')) {
        if (mutationsList[0].type == 'attributes' && mutationsList[0].target.style.borderColor == "green") {
          document.querySelector('#jspsych-wg-cont').disabled = false;
        }
        if (mutationsList[0].type == 'attributes' && mutationsList[0].target.style.borderColor == "red") {
          document.querySelector('#jspsych-wg-cont').disabled = true;
        }
      }
    }

    // function to end trial when it is time
    function end_trial() {
      
      jsPsych.extensions['webgazer'].pause();
      jsPsych.extensions['webgazer'].hideVideo();


      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // gather the data to store for the trial
      var trial_data = {
        load_time: load_time
      };

      // clear the display
      display_element.innerHTML = '';

      document.querySelector('#webgazer-center-style').remove();

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

  };

  return plugin;
})();