// ============= ABTI狗狗题库（12题，4维度×3题） =============
const questions = [
    // 维度1：外向(E) vs 内向(I)
    { 
        text: "家里来了陌生访客，狗狗会？",
        options: [
            { text: "立刻冲到门口摇尾巴、转圈，甚至跳起来舔人", score: {E:1} },
            { text: "躲在沙发下或主人身后，偷偷观察", score: {I:1} }
        ]
    },
    { 
        text: "在公园遇到其他狗狗时，它会？",
        options: [
            { text: "主动跑过去闻对方屁股，甚至挑衅玩耍", score: {E:1} },
            { text: "站在主人脚边，用余光瞟对方，等对方先靠近", score: {I:1} }
        ]
    },
    { 
        text: "主人带它去朋友家做客时，它会？",
        options: [
            { text: "冲进房间四处探索，跳上沙发嗅闻每个角落", score: {E:1} },
            { text: "安静地趴在主人脚边，偶尔抬头观察环境", score: {I:1} }
        ]
    },
    // 维度2：感知(S) vs 直觉(N)
    { 
        text: "主人拿出狗粮碗时，狗狗会？",
        options: [
            { text: "立刻冲到碗前，盯着每一粒狗粮，甚至用爪子扒拉", score: {S:1} },
            { text: "先闻闻碗，然后抬头看主人，仿佛在问：‘今天有加肉吗？’", score: {N:1} }
        ]
    },
    { 
        text: "主人说‘走，出门！’时，狗狗会？",
        options: [
            { text: "立刻跑到门口，疯狂转圈，甚至叼来牵引绳", score: {S:1} },
            { text: "先歪头思考，然后跑到窗边看看外面天气，再决定是否兴奋", score: {N:1} }
        ]
    },
    { 
        text: "主人给它一个未拆封的零食包装袋时，它会？",
        options: [
            { text: "直接用牙齿撕咬包装袋，试图打开", score: {S:1} },
            { text: "叼着包装袋跑到主人面前，放下后抬头看主人", score: {N:1} }
        ]
    },
    // 维度3：思考(T) vs 情感(F)
    { 
        text: "主人假装哭时，狗狗会？",
        options: [
            { text: "冷静观察，可能用爪子拍拍主人，但很快失去兴趣", score: {T:1} },
            { text: "立刻凑过来舔主人脸，甚至发出呜咽声", score: {F:1} }
        ]
    },
    { 
        text: "另一只狗狗抢了它的玩具时，它会？",
        options: [
            { text: "直接扑上去抢回来，甚至低吼警告", score: {T:1} },
            { text: "委屈地跑向主人，用眼神求助", score: {F:1} }
        ]
    },
    { 
        text: "主人因工作忙碌一整天没陪它玩，回家时它会？",
        options: [
            { text: "正常玩耍，但很快失去兴趣，转而自己找玩具", score: {T:1} },
            { text: "兴奋地扑向主人，叼来最喜欢的玩具，甚至发出委屈的呜咽声", score: {F:1} }
        ]
    },
    // 维度4：判断(J) vs 知觉(P)
    { 
        text: "每天散步时间到了，狗狗会？",
        options: [
            { text: "提前5分钟坐在门口，用爪子扒门，甚至叼来牵引绳", score: {J:1} },
            { text: "躺在沙发上打盹，直到主人喊‘走啦！’才慢悠悠起身", score: {P:1} }
        ]
    },
    { 
        text: "主人给它新玩具时，它会？",
        options: [
            { text: "立刻研究玩具功能，比如按按钮、扯绳子，直到弄坏", score: {J:1} },
            { text: "先闻闻、抱抱，然后叼到角落藏起来，偶尔玩一下", score: {P:1} }
        ]
    },
    { 
        text: "主人带它去户外玩，准备回家时，它会？",
        options: [
            { text: "主动走向门口，甚至叼来牵引绳，示意‘该走了’", score: {J:1} },
            { text: "躺在地上耍赖，被主人拉起来后还一步三回头", score: {P:1} }
        ]
    }
];

// ============= 16种犬格结果定义 =============
const typeResults = {
    "ESTJ": { name: "铁面警长", desc: "严格守规矩的指挥官！它喜欢秩序，会监督全家遵守作息（比如准时开饭、散步），是家里的小小纪律委员。适合有规律的生活，明确的指令会让他感到安心。" },
    "ESFP": { name: "戏精本精", desc: "天生表演艺术家！爱撒娇、会装可怜，总能轻松骗到零食和关注。它是家里的开心果，需要被观众环绕，讨厌被冷落。多陪它玩，它会用无限热情回报你。" },
    "INTJ": { name: "高冷谋士", desc: "深谋远虑的战略家！喜欢独自观察和思考，行动前会制定周密计划（比如如何优雅地偷走沙发上的鸡腿）。它独立自主，尊重它的私人空间，它会用忠诚守护作为回报。" },
    "INFP": { name: "忧郁诗人", desc: "敏感细腻的梦想家！内心世界丰富，容易共情。下雨天可能会望着窗外思考‘狗生’。它需要温柔、无压的环境，你的理解是它最大的安全感来源。" },
    "ENTP": { name: "杠精小能手", desc: "聪明爱辩论的发明家！对一切规则都充满好奇（和挑战欲），善于用聪明才智达到目的。它需要大量智力刺激，益智玩具和训练游戏是它的最爱。" },
    "ISFJ": { name: "暖心保姆", desc: "默默奉献的守护者！细心体贴，能敏锐察觉家人的情绪变化并默默陪伴。它忠诚可靠，喜欢被需要的感觉，是家庭最坚实的后盾。" },
    "ENFP": { name: "社交牛杂症", desc: "人见人爱的社牛达人！对两脚兽热情似火，是小区里的明星。可能需要学习一下‘狗际交往’的边界。带它多社交，它会为你拓展一个朋友圈。" },
    "ISTP": { name: "拆家工程师", desc: "动手能力超强的实干家！喜欢研究物体的内部结构（用嘴和爪子），是精准的‘沙发解剖学家’。提供足够的磨牙玩具和探索机会，引导它的破坏力转化为创造力。" },
    "ESFJ": { name: "八卦村长", desc: "热心肠的社区领袖！关心所有家庭成员（包括邻居家的狗），爱‘管闲事’。它渴望和谐与归属感，是家庭的社交粘合剂，多带它参与家庭活动。" },
    "INFJ": { name: "心灵导师", desc: "善解人意的安慰犬！直觉敏锐，能感知你未说出口的情绪，并给予安静的陪伴。它深沉而有洞察力，与它建立深层次的精神连接，你们会成为灵魂伴侣。" },
    "ENTJ": { name: "霸道总裁", desc: "天生的领导者！自信果断，喜欢掌控局面（包括其他宠物）。需要明确它的领导地位是你，同时给予它一些‘管理任务’（比如看管玩具），满足它的领导欲。" },
    "ISFP": { name: "佛系艺术家", desc: "随和淡泊的文艺青年！活在当下，享受生活的小确幸。散步时可能突然躺下晒太阳。不要强迫它，给予它自由表达的空间，它会用独特的温柔方式爱你。" },
    "ESTP": { name: "机会主义者", desc: "机敏灵活的冒险家！活在当下，善于抓住眼前的机会（比如门开一条缝就能溜出去）。精力旺盛，需要大量运动和新鲜刺激，否则可能会自己‘创造’冒险。" },
    "ISTJ": { name: "规矩狂魔", desc: "一丝不苟的公务员！严格遵守自己认定的规则（比如散步必须走固定路线）。它可靠、守信，给它的指令和生活习惯请尽量保持一致，变动会让他焦虑。" },
    "ENFJ": { name: "主人公犬", desc: "富有魅力的教育家！天生的‘狗队长’，喜欢组织和鼓励同伴（包括你）。它乐于助‘狗’，有强烈的道德感。让它参与家庭事务，它会成为你最得力的助手。" },
    "INTP": { name: "逻辑学家", desc: "理性客观的思想家！常常陷入‘我是谁’的哲学沉思。对世界充满好奇，但可能对普通的玩耍兴趣缺缺。用有趣的谜题和新奇的知识吸引它，它会成为你的智慧伙伴。" }
};

// ============= 全局变量和DOM元素 =============
let currentQuestionIndex = 0;
let scores = {E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0}; // 八个维度的原始得分
let dimensionTotals = {E:0, S:0, T:0, J:0}; // 四个维度的净得分（A倾向-B倾向）

// 获取页面元素
const startPage = document.getElementById('start-page');
const quizPage = document.getElementById('quiz-page');
const resultPage = document.getElementById('result-page');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentSpan = document.getElementById('current-question');
const progressFill = document.getElementById('progress-fill');
const resultCode = document.getElementById('result-code');
const resultName = document.getElementById('result-name');
const resultDesc = document.getElementById('result-desc');
const dynamicTypeSpan = document.getElementById('dynamic-type');
const payLink = document.getElementById('pay-link');
const restartBtn = document.getElementById('restart-btn');

// ============= 核心函数 =============
// 1. 开始测试
startBtn.addEventListener('click', startTest);
function startTest() {
    currentQuestionIndex = 0;
    scores = {E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0};
    startPage.classList.remove('active');
    quizPage.classList.add('active');
    updateProgress();
    showQuestion();
}

// 2. 显示题目
function showQuestion() {
    const q = questions[currentQuestionIndex];
    questionText.textContent = q.text;
    optionsContainer.innerHTML = '';
    q.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.text;
        button.dataset.score = JSON.stringify(option.score);
        button.addEventListener('click', selectAnswer);
        optionsContainer.appendChild(button);
    });
}

// 3. 选择答案
function selectAnswer(event) {
    // 累加分数到原始分
    const scoreDelta = JSON.parse(event.target.dataset.score); // 例如 {E:1}
    for (const [dim, val] of Object.entries(scoreDelta)) {
        scores[dim] += val; // scores.E += 1
    }

    // 下一题或结束
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        updateProgress();
        showQuestion();
    } else {
        calculateResult();
    }
}

// 4. 更新进度条
function updateProgress() {
    const percent = ((currentQuestionIndex) / questions.length) * 100;
    progressFill.style.width = percent + '%';
    currentSpan.textContent = currentQuestionIndex + 1;
}

// 5. 计算最终结果（核心逻辑）
function calculateResult() {
    // 5.1 计算每个维度的净得分（你的“三题占二”逻辑的数学表达）
    // 每个维度净得分 = 该维度正向分 - 该维度负向分
    // 例如：E/I维度净得分 = scores.E - scores.I
    // 若净得分 >=0，则为E；若净得分 <0，则为I
    dimensionTotals.E = scores.E - scores.I;
    dimensionTotals.S = scores.S - scores.N;
    dimensionTotals.T = scores.T - scores.F;
    dimensionTotals.J = scores.J - scores.P;

    // 5.2 根据净得分判断每个维度的倾向字母
    const typeCode = [
        dimensionTotals.E >= 0 ? 'E' : 'I',
        dimensionTotals.S >= 0 ? 'S' : 'N',
        dimensionTotals.T >= 0 ? 'T' : 'F',
        dimensionTotals.J >= 0 ? 'J' : 'P'
    ].join(''); // 例如 "ESTJ"

    // 5.3 切换到结果页并显示
    quizPage.classList.remove('active');
    resultPage.classList.add('active');
    displayResult(typeCode);
}

// 6. 显示结果
function displayResult(typeCode) {
    const result = typeResults[typeCode];
    if (result) {
        resultCode.textContent = typeCode;
        resultName.textContent = result.name;
        resultDesc.textContent = result.desc;
        dynamicTypeSpan.textContent = typeCode;
        // 更新付费链接，嵌入动态类型参数
        payLink.href = payLink.href.replace('XXXX', typeCode);
    } else {
        resultCode.textContent = typeCode;
        resultName.textContent = "稀有品种";
        resultDesc.textContent = "哇！你发现了一个极其罕见的犬格组合！我们的专家正在加紧研究...";
    }
}

// 7. 重新测试
restartBtn.addEventListener('click', () => {
    resultPage.classList.remove('active');
    startPage.classList.add('active');
});

// 初始化：显示总题数
document.addEventListener('DOMContentLoaded', () => {
    // 可以在这里进行一些初始化设置
});