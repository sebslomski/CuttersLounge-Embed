(function() {
    var CuttersLounge = {
        open: function() {
            var url = 'https://cutterslounge.de/' + this.getData().id;

            if ('ontouchstart' in window) {
                window.location = url
                return;
            }

            var frame = document.createElement('iframe');
            frame.setAttribute('src', url + '?embed=1');
            frame.setAttribute('id', 'cutterslounge-frame');

            frame.setAttribute('style', [
                'width: 700px',
                'height: 550px',
                'position: fixed',
                'z-index: 100010',
                'top: 50%',
                'right: 50%',
                'margin-top: -275px',
                'margin-right: -350px',
                'border: none'
            ].join(';'));

            var overlay = document.createElement('div');
            overlay.setAttribute('style', [
                'position: fixed',
                'top: 0',
                'left: 0',
                'right: 0',
                'bottom: 0',
                'z-index: 100000',
                'background: rgba(0, 0, 0, 0.4)',
                'transition: opacity 0.3s',
                '-webkit-transition: opacity 0.3s',
                '-moz-transition: opacity 0.3s',
                '-ms-transition: opacity 0.3s',
                'opacity: 0'
            ].join(';'));

            var overlayClose = document.createElement('div');
            overlayClose.setAttribute('style', [
                'position: fixed',
                'top: 50%',
                'right: 50%',
                'width: 30px',
                'height: 30px',
                'margin-top: -290px',
                'margin-right: -365px',
                'z-index: 100010',
                'border-radius: 50%',
                'background: #fff',
                'box-shadow: 0px 0px 3px rgba(0,0,0,0.8)',
                '-webkit-box-shadow: 0px 0px 3px rgba(0,0,0,0.8)',
                '-moz-box-shadow: 0px 0px 3px rgba(0,0,0,0.8)',
                '-ms-box-shadow: 0px 0px 3px rgba(0,0,0,0.8)',
                'color: #333746',
                'line-height: 30px',
                'font-weight: bold',
                'text-align: center',
                'font-family: helvetica',
                'cursor: pointer'
            ].join(';'));

            overlayClose.innerHTML = 'x';

            var that = this;
            overlay.onclick = function() {
                that.close();
            };

            overlay.appendChild(frame);
            overlay.appendChild(overlayClose);
            document.body.appendChild(overlay);
            this.overlay = overlay;

            setTimeout(function() {
                overlay.style.opacity = 1;
            }, 0);
        },

        close: function() {
            var that = this;
            this.overlay.style.opacity = 0;
            setTimeout(function() {
                that.overlay.parentNode.removeChild(that.overlay);
            }, 300);
        },

        getData: function() {
            var scripts = document.getElementsByTagName('script');
            var data = {};

            for (var i = 0; i < scripts.length; i++) {
                var script = scripts[i];
                if (script.hasAttribute('src') && script.getAttribute('src').indexOf('cutterslounge.de/embed/v1/embed.js') !== -1) {
                    data.id = script.getAttribute('data-id');
                    break;
                }
            }

            return data;
        }
    };

    document.addEventListener('DOMContentLoaded', function() {
        if (!CuttersLounge.getData().id) {
            throw new Error('CuttersLounge.Embed: No id given.');
            return;
        }

        var buttons = document.getElementsByClassName('cutterslounge-button');
        var links = document.getElementsByClassName('cutterslounge-link');

        for (var i=0; i<links.length; i++) {
            var elem = links[i];

            elem.onclick =function(event) {
                event.preventDefault();
                CuttersLounge.open();
            };
        }

        for (var i=0; i<buttons.length; i++) {
            var elem = buttons[i];

            elem.onclick =function(event) {
                event.preventDefault();
                CuttersLounge.open();
            };

            if (elem.className.indexOf('cutterslounge-button') !== -1) {
                elem.setAttribute('style', [
                    'width': 'auto',
                    'padding: 12px 20px',
                    'border: 1px solid #667694',
                    'border-radius: 3px',
                    'background: #7283a3',
                    'box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.1)',
                    '-webkit-box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.1)',
                    '-moz-box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.1)',
                    '-mos-box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.1)',
                    'text-align: center',
                    'font-weight: bold',
                    'font-size: 14px',
                    'color: #fff',
                    'cursor: pointer'
                ].join(';'));

                elem.onmouseover = function() {
                    elem.style.background = '#667694';
                };

                elem.onmouseout = function() {
                    elem.style.background = '#7283a3';
                };
            }
        }
    });

}());
