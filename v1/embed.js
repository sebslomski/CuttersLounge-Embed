(function() {
    var CuttersLounge = {
        open: function() {
            var frame = document.createElement('iframe');
            frame.setAttribute('src', '//cutterslounge.de/' + this.getData().id);
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
                'top: 0',
                'right: 0',
                'padding: 20px',
                'z-index: 100010',
                'background: rgba(255, 255, 255, 0.4)',
                'color: #fff',
                'cursor: pointer'
            ].join(';'));

            overlayClose.innerHTML = 'Zur&uuml;ck';

            var that = this;
            overlay.onclick = function() {
                that.close();
            };

            overlay.appendChild(overlayClose);
            overlay.appendChild(frame);
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
                that.overlay.remove();
            }, 300);
        },

        getData: function() {
            var scripts = document.getElementsByTagName('script');
            var data = {};

            for (var i = 0; i < scripts.length; i++) {
                var script = scripts[i];
                if (script.getAttribute('src').indexOf('cutterslounge.de/v1/embed.js') !== -1) {
                    data.id = script.getAttribute('data-id');
                    break;
                }
            }

            return data;
        }
    };

    document.addEventListener('DOMContentLoaded', function() {
        var button = document.getElementById('cutterslounge-button');
        if (button) {
            button.onclick =function(event) {
                event.preventDefault();
                CuttersLounge.open();
            };
        }

        button.setAttribute('style', [
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

        button.onmouseover = function() {
            button.style.background = '#667694';
        };

        button.onmouseout = function() {
            button.style.background = '#7283a3';
        };
    });

}());
