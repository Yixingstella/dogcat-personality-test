// ============= ABTI狗狗题库（12题，4维度×3题） =============
const questions = [
    // 维度1：外向(E) vs 内向(I)
    {
        text: "家里来了陌生访客，狗狗会？",
        options: [
            { text: "立刻冲到门口摇尾巴、转圈，甚至跳起来舔人", score: { E: 1 } },
            { text: "躲在沙发下或主人身后，偷偷观察", score: { I: 1 } }
        ]
    },
    {
        text: "在公园遇到其他狗狗时，它会？",
        options: [
            { text: "主动跑过去闻对方屁股，甚至挑衅玩耍", score: { E: 1 } },
            { text: "站在主人脚边，用余光瞟对方，等对方先靠近", score: { I: 1 } }
        ]
    },
    {
        text: "主人带它去朋友家做客时，它会？",
        options: [
            { text: "冲进房间四处探索，跳上沙发嗅闻每个角落", score: { E: 1 } },
            { text: "安静地趴在主人脚边，偶尔抬头观察环境", score: { I: 1 } }
        ]
    },
    // 维度2：感知(S) vs 直觉(N)
    {
        text: "主人拿出狗粮碗时，狗狗会？",
        options: [
            { text: "立刻冲到碗前，盯着每一粒狗粮，甚至用爪子扒拉", score: { S: 1 } },
            { text: "先闻闻碗，然后抬头看主人，仿佛在问：‘今天有加肉吗？’", score: { N: 1 } }
        ]
    },
    {
        text: "主人说‘走，出门！’时，狗狗会？",
        options: [
            { text: "立刻跑到门口，疯狂转圈，甚至叼来牵引绳", score: { S: 1 } },
            { text: "先歪头思考，然后跑到窗边看看外面天气，再决定是否兴奋", score: { N: 1 } }
        ]
    },
    {
        text: "主人给它一个未拆封的零食包装袋时，它会？",
        options: [
            { text: "直接用牙齿撕咬包装袋，试图打开", score: { S: 1 } },
            { text: "叼着包装袋跑到主人面前，放下后抬头看主人", score: { N: 1 } }
        ]
    },
    // 维度3：思考(T) vs 情感(F)
    {
        text: "主人假装哭时，狗狗会？",
        options: [
            { text: "冷静观察，可能用爪子拍拍主人，但很快失去兴趣", score: { T: 1 } },
            { text: "立刻凑过来舔主人脸，甚至发出呜咽声", score: { F: 1 } }
        ]
    },
    {
        text: "另一只狗狗抢了它的玩具时，它会？",
        options: [
            { text: "直接扑上去抢回来，甚至低吼警告", score: { T: 1 } },
            { text: "委屈地跑向主人，用眼神求助", score: { F: 1 } }
        ]
    },
    {
        text: "主人因工作忙碌一整天没陪它玩，回家时它会？",
        options: [
            { text: "正常玩耍，但很快失去兴趣，转而自己找玩具", score: { T: 1 } },
            { text: "兴奋地扑向主人，叼来最喜欢的玩具，甚至发出委屈的呜咽声", score: { F: 1 } }
        ]
    },
    // 维度4：判断(J) vs 知觉(P)
    {
        text: "每天散步时间到了，狗狗会？",
        options: [
            { text: "提前5分钟坐在门口，用爪子扒门，甚至叼来牵引绳", score: { J: 1 } },
            { text: "躺在沙发上打盹，直到主人喊‘走啦！’才慢悠悠起身", score: { P: 1 } }
        ]
    },
    {
        text: "主人给它新玩具时，它会？",
        options: [
            { text: "立刻研究玩具功能，比如按按钮、扯绳子，直到弄坏", score: { J: 1 } },
            { text: "先闻闻、抱抱，然后叼到角落藏起来，偶尔玩一下", score: { P: 1 } }
        ]
    },
    {
        text: "主人带它去户外玩，准备回家时，它会？",
        options: [
            { text: "主动走向门口，甚至叼来牵引绳，示意‘该走了’", score: { J: 1 } },
            { text: "躺在地上耍赖，被主人拉起来后还一步三回头", score: { P: 1 } }
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
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
let userAnswers = new Array(questions.length).fill(null); // 记录每道题的选择索引

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

// 新增：导航和名片相关元素
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const uploadPhotoInput = document.getElementById('upload-photo');
const generateCardBtn = document.getElementById('generate-card');
const photoFilename = document.getElementById('photo-filename');
const cardPreview = document.getElementById('card-preview');
const nameCardCanvas = document.getElementById('name-card-canvas');

// 当前上传的狗狗照片对象
let currentDogPhoto = null;

// ============= 核心函数 - 测试流程 =============
// 1. 开始测试
startBtn.addEventListener('click', startTest);
function startTest() {
    currentQuestionIndex = 0;
    scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    userAnswers.fill(null); // 清空答案记录
    startPage.classList.remove('active');
    quizPage.classList.add('active');
    updateProgress();
    showQuestion();
    updateNavButtons();
}

// 2. 显示题目（含恢复已选答案）
function showQuestion() {
    const q = questions[currentQuestionIndex];
    questionText.textContent = q.text;
    optionsContainer.innerHTML = '';

    q.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.text;
        // 如果此题已选过，恢复选中状态
        if (userAnswers[currentQuestionIndex] === index) {
            button.classList.add('selected');
        }
        button.addEventListener('click', () => selectAnswer(button, index, option.score));
        optionsContainer.appendChild(button);
    });

    updateProgress();
    updateNavButtons();
}

// 3. 选择答案
function selectAnswer(button, selectedIndex, scoreDelta) {
    // 清除当前题目所有选项的选中样式
    const allOptions = optionsContainer.querySelectorAll('.option-btn');
    allOptions.forEach(opt => opt.classList.remove('selected'));
    // 高亮当前选中项
    button.classList.add('selected');

    // 记录答案
    userAnswers[currentQuestionIndex] = selectedIndex;

    // 更新导航按钮状态
    updateNavButtons();
}

// 4. 更新导航按钮状态
function updateNavButtons() {
    // 上一题按钮：如果不是第一题，则可点击
    prevBtn.disabled = currentQuestionIndex === 0;

    // 下一题按钮：如果当前题已选，则可点击
    const isCurrentAnswered = userAnswers[currentQuestionIndex] !== null;
    nextBtn.disabled = !isCurrentAnswered;

    // 提交按钮：如果是最后一题且已答，则显示
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    nextBtn.style.display = isLastQuestion ? 'none' : 'block';
    submitBtn.style.display = isLastQuestion && isCurrentAnswered ? 'block' : 'none';
}

// 5. “上一题”按钮点击
prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
});

// 6. “下一题”按钮点击
nextBtn.addEventListener('click', () => {
    if (userAnswers[currentQuestionIndex] === null) {
        alert('请先选择当前题的答案！');
        return;
    }
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
});

// 7. “提交”按钮点击（检查所有题目）
submitBtn.addEventListener('click', () => {
    // 检查是否所有题目都已答完
    const hasUnanswered = userAnswers.includes(null);
    if (hasUnanswered) {
        alert('请完成所有题目后再提交！');
        return;
    }
    // 如果全部答完，计算分数并跳转结果页
    calculateResultFromAnswers();
});

// 8. 根据记录的答案计算最终结果
function calculateResultFromAnswers() {
    // 重置分数
    scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    // 遍历所有答案，累加分数
    userAnswers.forEach((answerIndex, qIndex) => {
        if (answerIndex !== null) {
            const scoreDelta = questions[qIndex].options[answerIndex].score;
            for (const [dim, val] of Object.entries(scoreDelta)) {
                scores[dim] += val;
            }
        }
    });

    // 计算每个维度的净得分
    const dimensionTotals = {
        E: scores.E - scores.I,
        S: scores.S - scores.N,
        T: scores.T - scores.F,
        J: scores.J - scores.P
    };

    // 判断每个维度的倾向字母
    const typeCode = [
        dimensionTotals.E >= 0 ? 'E' : 'I',
        dimensionTotals.S >= 0 ? 'S' : 'N',
        dimensionTotals.T >= 0 ? 'T' : 'F',
        dimensionTotals.J >= 0 ? 'J' : 'P'
    ].join('');

    // 切换到结果页并显示
    quizPage.classList.remove('active');
    resultPage.classList.add('active');
    displayResult(typeCode);
}

// 9. 显示结果
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

// 10. 更新进度条
function updateProgress() {
    const percent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = percent + '%';
    currentSpan.textContent = currentQuestionIndex + 1;
}

// 11. 重新测试
restartBtn.addEventListener('click', () => {
    resultPage.classList.remove('active');
    startPage.classList.add('active');
});

// ============= 核心函数 - 生成性格名片 =============
// 12. 监听照片上传
uploadPhotoInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;

    // 验证文件类型
    if (!file.type.match('image.*')) {
        alert('请选择图片文件（JPG、PNG等）');
        return;
    }

    // 验证文件大小（例如限制在5MB内）
    if (file.size > 5 * 1024 * 1024) {
        alert('图片大小请勿超过5MB');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        currentDogPhoto = new Image();
        currentDogPhoto.onload = function () {
            photoFilename.textContent = `已选择：${file.name}`;
            generateCardBtn.disabled = false; // 启用生成按钮
            // 可以在这里显示一个小的预览图（可选）
            // cardPreview.src = event.target.result;
            // cardPreview.style.display = 'block';
        };
        currentDogPhoto.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

// 13. 生成名片按钮点击
generateCardBtn.addEventListener('click', generateNameCard);

// 14. 名片生成核心函数
function generateNameCard() {
    if (!currentDogPhoto) {
        alert('请先上传一张狗狗照片！');
        return;
    }

    const canvas = nameCardCanvas;
    const ctx = canvas.getContext('2d');

    // 1. 设置名片尺寸（适合手机屏幕分享）
    const cardWidth = 750;
    const cardHeight = 1334;
    canvas.width = cardWidth;
    canvas.height = cardHeight;

    // 2. 绘制渐变背景
    const gradient = ctx.createLinearGradient(0, 0, cardWidth, cardHeight);
    gradient.addColorStop(0, '#8EC5FC');
    gradient.addColorStop(1, '#E0C3FC');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, cardWidth, cardHeight);

    // 3. 绘制一个可爱的狗狗爪印或骨头背景图案（简单示例）
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    // 这里可以添加一些装饰性图形

    // 4. 绘制狗狗照片（圆形裁剪效果）
    const photoSize = 400;
    const photoX = (cardWidth - photoSize) / 2;
    const photoY = 150;

    // 先绘制一个圆形裁剪路径
    ctx.save();
    ctx.beginPath();
    ctx.arc(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // 绘制图片
    ctx.drawImage(currentDogPhoto, photoX, photoY, photoSize, photoSize);
    ctx.restore();

    // 5. 绘制照片的白色描边
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
    ctx.stroke();

    // 6. 绘制性格信息区域
    const infoY = photoY + photoSize + 80;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(60, infoY, cardWidth - 120, 380);

    // 7. 绘制性格标题
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 60px "Microsoft YaHei"';
    ctx.textAlign = 'center';
    ctx.fillText(`${resultName.textContent}`, cardWidth / 2, infoY + 80);

    // 8. 绘制性格代码
    ctx.fillStyle = '#666666';
    ctx.font = '40px "Microsoft YaHei"';
    ctx.fillText(`${resultCode.textContent}`, cardWidth / 2, infoY + 140);

    // 9. 绘制性格描述（自动换行）
    ctx.fillStyle = '#444444';
    ctx.font = '30px "Microsoft YaHei"';
    ctx.textAlign = 'left';
    const maxWidth = cardWidth - 180;
    const lineHeight = 42;
    const description = resultDesc.textContent;
    wrapText(ctx, description, 90, infoY + 220, maxWidth, lineHeight);

    // 10. 绘制底部装饰和网址
    ctx.textAlign = 'center';
    ctx.fillStyle = '#888888';
    ctx.font = '24px "Microsoft YaHei"';
    ctx.fillText('ABTI犬格测试 · 生成专属回忆', cardWidth / 2, cardHeight - 60);

    // 11. 生成图片并触发下载
    const dataURL = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    const timestamp = new Date().getTime();
    downloadLink.href = dataURL;
    downloadLink.download = `狗狗性格名片_${resultCode.textContent}_${timestamp}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // 12. 显示预览图
    cardPreview.src = dataURL;
    cardPreview.style.display = 'block';
    alert('名片已生成并开始下载！如果没有自动下载，请检查浏览器设置。');
}

// 15. 文字换行辅助函数
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split('');
    let line = '';
    let lineCount = 0;
    const maxLines = 4; // 最多显示4行

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n];
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if ((testWidth > maxWidth && n > 0) || words[n] === '\n') {
            context.fillText(line, x, y);
            line = words[n] === '\n' ? '' : words[n];
            y += lineHeight;
            lineCount++;
            if (lineCount >= maxLines) {
                // 如果超过最大行数，添加省略号
                context.fillText(line.substring(0, line.length - 1) + '...', x, y);
                return;
            }
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}

// 页面加载完成后初始化一些状态
document.addEventListener('DOMContentLoaded', () => {
    // 确保生成名片按钮初始为禁用状态
    generateCardBtn.disabled = true;
});