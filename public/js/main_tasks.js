var camera_instructions = {
    type: 'html-button-response',
    stimulus: `
        <p><b>在开始实验前，这是有关本研究的重要信息：</b></p><br>
        <p><b>意图：</b>这项研究的意图在于了解人们是如何看待街景照片中的族裔社区</p>
        <p><b>任务流程：</b>
            您将会观察一系列的街景照片，在这个过程中，请集中注意力观察照片中你认为可能是族裔社区的区域。<br>
            我们将使用您电脑的摄像头来跟踪您的眼动。在研究进行过程的某个点，我们请求允许打开您的摄像头。<br>
            完成研究需要这样做。我们唯一要用摄像头录制的就是您的视线在电脑屏幕上显示的位置。<br>
            此数据将仅由水平坐标和垂直坐标（即两个数字）组成。在研究开始前将有一个简短的校准和验证过程。<br>
        </p>
        <p><b>实验时间：</b>
            此项研究大概会占用您10分钟左右的时间，实验过程中请尽量不要暂停以及终止实验。
        <p><b>联系方式和问题：</b>有关本研究的问题、意见和担忧，您可以联系 <b style="color: green;">Gershun Yuan / 袁广盛 (gsyuan@m.scnu.edu.cn)</b>
        <p><b>如果您不同意此项研究，请关闭网页</b></p>
        </p><br>
    `,
    choices: ['我已阅读并同意'],
    post_trial_gap: 1000
};

var start_up_survery_trial = {
    type: 'survey-text',
    questions: [
        { prompt: "姓名", rows: 1, columns: 20, name: 'RealName' },
        { prompt: "目前的居住地（广州/香港/澳门）", rows: 1, columns: 20, name: 'Location' },
        { prompt: "年龄（请填写数字）", rows: 1, columns: 20, name: 'Age' },
        { prompt: "性别（男性/女性）", rows: 1, columns: 20, name: 'Gender' }
    ],
    preamble: `
    <div><b>感谢您同意继续实验！请回答以下问题，开始实验。</b></div>
    <p>当您提交信息之后，页面可能会暂停片刻，这是正常现象，注意观察网页弹出的摄像头请求并同意</p>
    `,
};

var preload = {
    type: 'preload',
    iamges: ['img/streetviewImg/1.jpg']
}

var init_camera = {
    type: 'webgazer-init-camera'
}

var calibration_instructions = {
    type: 'html-button-response',
    stimulus: `
      <p>非常好，眼睛跟踪器将被校准，以将你的眼睛图像从摄像头转换到屏幕上的某个位置。</p>
      <p>为此，您需要单击一系列点。</p>
      <p>保持头部静止，点击每个出现的点。单击圆点的同时请看着点。</p>
      <p><img height="200px" width="1000px" src="img/instruct1.png" /><p>
    `,
    choices: ['继续'],
    post_trial_gap: 1000
};

var calibration = {
    type: 'webgazer-calibrate',
    calibration_points: [[50, 50], [25, 25], [25, 75], [75, 25], [75, 75]],
    //calibration_points: [[10,10],[10,30],[10,50],[10,70],[10,90],[30,10],[30,30],[30,50],[30,70],[30,90],[50,10],[50,30],[50,50],[50,70],[50,90],[70,10],[70,30],[70,50],[70,70],[70,90],[90,10],[90,30],[90,50],[90,70],[90,90]],
    // calibration_points: [
    //   [10,10],[10,50],[10,90],
    //   [30,10],[30,50],[30,90],
    //   [40,10],[40,30],[40,40],[40,45],[40,50],[40,55],[40,60],[40,70],[40,90],
    //   [50,10],[50,30],[50,40],[50,45],[50,50],[50,55],[50,60],[50,70],[50,90],
    //   [60,10],[60,30],[60,40],[60,45],[60,50],[60,55],[60,60],[60,70],[60,90],
    //   [70,10],[70,50],[70,90],
    //   [90,10],[90,50],[90,90]],
    repetitions_per_point: 1,
    randomize_calibration_order: true,
};

var validation_instructions = {
    type: 'html-button-response',
    stimulus: `
    <p>让我们看看眼睛跟踪有多准确。</p>
    <p>保持你的头静止，移动你的眼睛，在每个点出现时集中注意力。</p>
    <p>你不需要点击这些点。只要移动你的眼睛看看这些点。</p>
    `,
    choices: ['继续'],
    post_trial_gap: 1000
}

var validation = {
    type: 'webgazer-validate',
    validation_points: [[25, 25], [25, 75], [75, 25], [75, 75]],
    show_validation_data: true
}

var task_instructions = {
    type: 'html-keyboard-response',
    stimulus: `
    <p>我们现在即将展示图片</p>
    <p>每张图片将展示10s，之后会自动切换到下一张</p>
    <p>每三张图片展示完成后，您将会短暂的休息一点时间，知道您准备好，并按下空格</p>
    `,
    post_trial_gap: 1000
}
// 十字丝用来在展示图片之前集中被试的注意力
var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<p style="font-size:40px;">+</p>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 500
}

var trial = {
    type: 'image-keyboard-response',
    stimulus: 'img/streetviewImg/1.jpg',
    stimulus_width:1500,
    choices: jsPsych.NO_KEYS,
    trial_duration: 10000,
    extensions: [
        {
            type: 'webgazer',
            params: { targets: ['#jspsych-image-keyboard-response-stimulus'] }
        }
    ]
}

var done = {
    type: 'html-button-response',
    choices: ['CSV', 'JSON'],
    stimulus: `<p>实验结束！</p><p>如果要下载实验数据的副本，请单击下面的格式，浏览器将会自动开始下载。</p>`,
    on_finish: function (data) {
        if (data.response == 0) {
            jsPsych.data.get().localSave('csv', 'sample-data.csv');
        }
        if (data.response == 1) {
            jsPsych.data.get().localSave('json', 'sample-data.json');
        }
    }
}

var timeline = [];
timeline.push(camera_instructions);
timeline.push(start_up_survery_trial);
timeline.push(init_camera);
timeline.push(calibration_instructions);
timeline.push(calibration);
// timeline.push(validation_instructions);
// timeline.push(validation);
timeline.push(task_instructions);
timeline.push(fixation);
timeline.push(trial);
timeline.push(done);

jsPsych.init({
    timeline: timeline,
    on_finish: function () { jsPsych.data.displayData(); },
    extensions: [
        { type: 'webgazer' }
    ]
})