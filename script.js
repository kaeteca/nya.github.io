const qs = (selector) => {
    return document.querySelector(selector);
};


/* =========================
   START
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupNavigation();

        setupQuiz();

        setupForever();

        setupMusic();

    }
);


/* =========================
   ПЕРЕХОДЫ
========================= */

/*
    ВАЖНО:

    Здесь НЕТ рассыпания.

    Обычные страницы переключаются
    напрямую.
*/

function setupNavigation() {

    document
        .querySelectorAll("[data-go]")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const target =
                        button.dataset.go;

                    window.location.href =
                        target;

                }
            );

        });

}


/* =========================
   ОПРОС
========================= */

function setupQuiz() {

    const quiz =
        qs("#quiz");

    if (!quiz) {
        return;
    }


    const questions = [

        {
            text:
                "Как мы называем друг друга?",

            answers: [

                "Вупсень и Пупсень",

                "Биба и Боба",

                "Пупи и Лупи"

            ],

            correct:
                2,

            wrong: {

                0:
                    "Возможно, мы могли быть ими, но нет, по-другому",

                1:
                    "Возможно, мы могли быть ими, но нет, по-другому"

            }

        },


        {
            text:
                "У кого из стримеров мы с тобой познакомились?",

            answers: [

                "Recrent",

                "Bratishkinoff",

                "Jamside"

            ],

            correct:
                0,

            wrong: {

                1:
                    "Постараюсь заснайпить его и написать твой ник :)",

                2:
                    "Не, этого любителя долбёжки в уши ты не смотришь, это невозможно"

            }

        },


        {
            text:
                "Первая игра, в которую мы пошли?",

            answers: [

                "Minecraft",

                "PUBG",

                "Counter-Strike 2"

            ],

            correct:
                2,

            wrong: {

                0:
                    "Когда-нибудь пойдем туда :)",

                1:
                    "Когда-нибудь пойдем туда :)"

            }

        }

    ];


    let currentQuestion = 0;


    const questionText =
        qs("#questionText");

    const answersBox =
        qs("#answers");

    const counter =
        qs("#questionCounter");

    const progress =
        qs("#questionProgress");

    const feedback =
        qs("#feedback");

    const loading =
        qs("#loadingScreen");

    const success =
        qs("#successScreen");

    const progressBar =
        qs("#progressBar");

    const loadingPercent =
        qs("#loadingPercent");

    const okButton =
        qs("#okButton");


    /* =========================
       ОТОБРАЖЕНИЕ ВОПРОСА
    ========================= */

    function renderQuestion() {

        const question =
            questions[currentQuestion];


        questionText.textContent =
            question.text;


        counter.textContent =
            `Вопрос ${currentQuestion + 1} / ${questions.length}`;


        progress.textContent =
            `${Math.round(
                ((currentQuestion + 1)
                / questions.length) * 100
            )}%`;


        feedback.textContent =
            "";

        feedback.classList.remove(
            "show"
        );


        answersBox.innerHTML =
            "";


        question.answers.forEach(
            (answer, index) => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.className =
                    "answer";


                button.textContent =
                    answer;


                button.addEventListener(
                    "click",
                    () => {

                        /* ПРАВИЛЬНЫЙ ОТВЕТ */

                        if (
                            index ===
                            question.correct
                        ) {

                            if (
                                currentQuestion
                                <
                                questions.length - 1
                            ) {

                                currentQuestion++;

                                renderQuestion();

                            } else {

                                quiz.classList.add(
                                    "hidden"
                                );

                                loading.classList.remove(
                                    "hidden"
                                );

                                runLoading();

                            }

                        }


                        /* НЕПРАВИЛЬНЫЙ ОТВЕТ */

                        else {

                            feedback.textContent =
                                question.wrong[index] || "";


                            feedback.classList.add(
                                "show"
                            );


                            button.classList.remove(
                                "wrong-shake"
                            );


                            void button.offsetWidth;


                            button.classList.add(
                                "wrong-shake"
                            );

                        }

                    }
                );


                answersBox.appendChild(
                    button
                );

            }
        );

    }


    /* =========================
       ЗАГРУЗКА
    ========================= */

    function runLoading() {

        let value =
            0;


        const timer =
            setInterval(
                () => {

                    value +=
                        Math.floor(
                            Math.random() * 5
                        ) + 1;


                    if (
                        value >= 100
                    ) {

                        value =
                            100;


                        clearInterval(
                            timer
                        );


                        setTimeout(
                            () => {

                                loading.classList.add(
                                    "hidden"
                                );


                                success.classList.remove(
                                    "hidden"
                                );

                            },
                            350
                        );

                    }


                    progressBar.style.width =
                        `${value}%`;


                    loadingPercent.textContent =
                        `${value}%`;

                },
                85
            );

    }


    /* =========================
       КНОПКА ОК
    ========================= */

    okButton.addEventListener(
        "click",
        () => {

            /*
                Здесь тоже НЕТ рассыпания.
            */

            window.location.href =
                "message.html";

        }
    );


    renderQuestion();

}


/* =========================
   ФИНАЛ
========================= */

function setupForever() {

    const buttons =
        document.querySelectorAll(
            ".forever-btn"
        );


    if (!buttons.length) {
        return;
    }


    buttons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    /*
                        ВОТ ЗДЕСЬ ЕДИНСТВЕННОЕ
                        РАССЫПАНИЕ САЙТА.
                    */

                    createPixelEffect();


                    setTimeout(
                        () => {

                            const card =
                                qs("#foreverCard");


                            const finalScreen =
                                qs("#finalScreen");


                            if (card) {

                                card.classList.add(
                                    "hidden"
                                );

                            }


                            if (finalScreen) {

                                finalScreen.classList.remove(
                                    "hidden"
                                );

                            }


                            const overlay =
                                document.querySelector(
                                    ".pixel-overlay"
                                );


                            if (overlay) {

                                overlay.style.display =
                                    "none";

                            }

                        },
                        950
                    );

                }
            );

        }
    );

}


/* =========================
   СОЗДАНИЕ ПИКСЕЛЕЙ
========================= */

function createPixelEffect() {

    if (
        document.querySelector(
            ".pixel-overlay"
        )
    ) {
        return;
    }


    const overlay =
        document.createElement(
            "div"
        );


    overlay.className =
        "pixel-overlay active";


    const count =
        Math.min(
            320,
            Math.max(
                120,
                Math.floor(
                    window.innerWidth *
                    window.innerHeight /
                    8500
                )
            )
        );


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const pixel =
            document.createElement(
                "i"
            );


        pixel.className =
            "pixel";


        const size =
            Math.random() * 10 + 3;


        const x =
            Math.random() * 100;


        const y =
            Math.random() * 100;


        const tx =
            (Math.random() - 0.5)
            * 900;


        const ty =
            (Math.random() - 0.5)
            * 900;


        const delay =
            Math.random() * 0.35;


        const duration =
            0.45 +
            Math.random() * 0.8;


        pixel.style.setProperty(
            "--s",
            `${size}px`
        );


        pixel.style.setProperty(
            "--x",
            `${x}%`
        );


        pixel.style.setProperty(
            "--y",
            `${y}%`
        );


        pixel.style.setProperty(
            "--tx",
            `${tx}px`
        );


        pixel.style.setProperty(
            "--ty",
            `${ty}px`
        );


        pixel.style.setProperty(
            "--r",
            `${(Math.random() - 0.5) * 720}deg`
        );


        pixel.style.setProperty(
            "--d",
            `${duration}s`
        );


        pixel.style.setProperty(
            "--a",
            `${0.25 + Math.random() * 0.75}`
        );


        pixel.style.animationDelay =
            `${delay}s`;


        overlay.appendChild(
            pixel
        );

    }


    document.body.appendChild(
        overlay
    );

}


/* =========================
   МУЗЫКА
========================= */

function setupMusic() {

    let audio = null;

    let started =
        false;


    /*
        Музыка начинает играть
        после первого клика.

        Файл:

        music/music.mp3
    */

    document.addEventListener(
        "click",
        () => {

            if (started) {
                return;
            }


            started =
                true;


            audio =
                new Audio(
                    "music/music.mp3"
                );


            audio.loop =
                true;


            audio.volume =
                0.1;


            audio.play()
                .catch(
                    () => {
                        /*
                            Если музыки нет
                            или браузер заблокировал
                            воспроизведение —
                            сайт продолжит работать.
                        */
                    }
                );

        },
        {
            once: true
        }
    );

}
