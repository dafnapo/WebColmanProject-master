"use strict";

// import data from "../data.json" assert { type: "json" };

// var ads = data;
fetch("/data")
  .then((data) => {
    return data.json();
  })
  .then((res) => {
    const ads = res;
    console.log(ads);
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
                console.log(ad);
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
                        if (ad.imagesUrl.length > 0) {
                          $imagem = $(document.createElement("img"));
                          $imagem.attr(
                            "src",
                            "images/slider" + currentSlide + ".jpg"
                          );
                          $imagem.appendTo($slider);
                          if (++currentSlide === ad.imagesUrl.length + 1) {
                            currentSlide = 1;
                          }
                        }
                        $slider
                          .contents()
                          .filter(function () {
                            return this.nodeType == 3;
                          })
                          .remove();
                        if (ad.texts.length > 0) {
                          let $text = $(document.createElement("p"));
                          $text = ad.texts[currentText];
                          $slider.append($text);

                          if (++currentText === ad.texts.length) {
                            currentText = 0;
                          }
                        }
                      }
                    );
                  }, pause);
                }
                function pauseSlider() {
                  clearInterval(interval);
                }

                $slider
                  .on("mouseenter", pauseSlider)
                  .on("mouseleave", startSlider);

                startSlider();
              }
            }
          });
        }
      });
    });
  });
