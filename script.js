"use strict";

var ads = [
  {
    name: "one",
    templateUrl: "templates/templateA.html",
    texts: ["text1", "text2", "text3", "text4"],
    imagesUrl: ["images/slider1.jpg", "images/slider2.jpg"],
    days: {
      monday: {
        fromHour: 6,
        toHour: 12,
      },
      wednesday: {
        fromHour: 13,
        toHour: 20,
      },
    },

    fromDate: "1/1/2022",
    toDate: "12/31/2022",
    timeDuration: 3,
    screens: { 1: true, 2: true },
  },
  {
    name: "two",
    templateUrl: "templates/templateB.html",
    texts: [
      "text1",
      "text2",
      "text3",
      "text4",
      "text5",
      "text6",
      "text7",
      "text8",
      "text9",
      "text10",
    ],
    imagesUrl: ["images/slider1.jpg"],
    days: {
      tuesday: {
        fromHour: 10,
        toHour: 16,
      },
      wednesday: {
        fromHour: 10,
        toHour: 16,
      },
    },
    fromDate: "3/1/2022",
    toDate: "4/31/2022",
    timeDuration: 5,
    screens: { 1: true, 3: true },
  },
  {
    name: "three",
    templateUrl: "templates/templateC.html",
    texts: [],
    imagesUrl: [],
    days: {
      all: true,
      fromHour: 8,
      toHour: 22,
    },
    fromDate: "5/1/2022",
    toDate: "6/15/2022",
    timeDuration: 7,
    screens: { 2: true, 3: true },
  },
  {
    name: "four",
    templateUrl: "templates/templateA.html",
    texts: ["text1", "text2"],
    imagesUrl: [],
    days: {
      monday: {
        fromHour: 15,
        toHour: 19,
      },
    },
    fromDate: "3/29/2022",
    toDate: "4/15/2022",
    timeDuration: 4,
    screens: { 1: true },
  },
  {
    name: "five",
    templateUrl: "templates/templateB.html",
    texts: ["text1", "text2", "text3", "text4", "text5", "text6", "text7"],
    imagesUrl: ["images/slider1.jpg", "images/slider2.jpg"],
    days: {
      monday: {
        fromHour: 1,
        toHour: 23,
      },
      tuesday: {
        fromHour: 1,
        toHour: 23,
      },
      wednesday: {
        fromHour: 1,
        toHour: 23,
      },
    },

    fromDate: "4/1/2022",
    toDate: "4/31/2022",
    timeDuration: 6,
    screens: { 3: true },
  },
];

$(document).ready(function () {
  var dt = new Date();
  var dayz = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const dateCheck = (from, to, check) => {
    let fDate, lDate, cDate;
    fDate = Date.parse(from);
    lDate = Date.parse(to);
    cDate = Date.parse(check);
    if (cDate <= lDate && cDate >= fDate) return true;
    return false;
  };

  const hourCheck = (from, to, check) => {
    if (check <= to && check >= from) return true;
    return false;
  };

  ads.forEach((ad) => {
    if (
      dateCheck(
        ad.fromDate,
        ad.toDate,
        dt.getMonth() + 1 + "/" + dt.getDate() + "/" + dt.getFullYear()
      )
    ) {
      Object.keys(ad.days).forEach((day) => {
        if (dayz[dt.getDay()] === day || day === "all") {
          if (hourCheck(ad.days.fromHour, ad.days.toHour, dt.getHours())) {
            //settings for slider
            var width = 720;
            var animationSpeed = 1000;
            var pause = ad.timeDuration * 100; //1000
            var currentSlide = 1;
            var currentText = 0;

            //cache DOM elements
            var $slider = $("#slider");
            var $imagem;

            var $template = ad.templateUrl;
            $slider.load($template);

            var interval;
            function startSlider() {
              interval = setInterval(function () {
                $slider.animate(
                  { scorllLeft: "-=" + width },
                  animationSpeed,
                  function () {
                    if ($imagem != undefined) {
                      $imagem.remove();
                    }

                    console.log(ad.imagesUrl[currentSlide - 1]);
                    console.log(ad.texts[currentText]);

                    $imagem = $(document.createElement("img"));
                    $imagem.attr(
                      "src",
                      "images/slider" + currentSlide + ".jpg"
                    );
                    $imagem.appendTo($slider);

                    $slider
                      .contents()
                      .filter(function () {
                        return this.nodeType == 3;
                      })
                      .remove();

                    let $text = $(document.createElement("p"));
                    $text = ad.texts[currentText];
                    $slider.append($text);

                    if (++currentSlide === ad.imagesUrl.length + 1) {
                      currentSlide = 1;
                    }

                    if (++currentText === ad.texts.length) {
                      currentText = 0;
                    }
                  }
                );
              }, pause);
            }
            function pauseSlider() {
              clearInterval(interval);
            }

            $slider.on("mouseenter", pauseSlider).on("mouseleave", startSlider);

            startSlider();
          }
        }
      });
    }
  });
});
