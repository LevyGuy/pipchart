
class Pip {
    video;
    set(canvas, togglePipButton) {
        this.canvas = canvas;
        this.togglePipButton = togglePipButton;

        const pipSupport = Pip.detectPipSupport();
        if (!pipSupport) {
            console.log('This browser does not support picture in picture!');
            this.togglePipButton.disabled = true;
            return;
        }

        if (!this.video) this.createVideoNode();
        this.initStream();
        this.initEventListener();
    }
    static detectPipSupport(){
        return 'pictureInPictureEnabled' in document;
    }
    createVideoNode() {
        this.canvas.insertAdjacentHTML(
            'afterend',
            `
                <video playsinline autoplay muted
                    style="visibility: hidden; position: absolute; top: 0; left: 0; z-index: -9999;" id="_pip-video"></video>
            `
            );
        this.video = document.getElementById('_pip-video');
    }
    initStream() {
        this.video.srcObject = this.canvas.captureStream();
    }
    initEventListener() {
        this.togglePipButton.addEventListener('click', async _ => {
            this.togglePipButton.disabled = true;
            try {

                if (this.video !== document.pictureInPictureElement)
                    await this.video.requestPictureInPicture();
                else
                    await document.exitPictureInPicture();

            } catch(error) {
                console.log(`> Argh! ${error}`);
            } finally {
                this.togglePipButton.disabled = false;
            }
        });
    }
}

export default new Pip();