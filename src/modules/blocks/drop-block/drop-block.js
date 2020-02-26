export class DropBlock {
	constructor (options) {
		this.dropBlock = options.selector;
		this.inputFile = this.dropBlock.querySelector('.drop-block__input');
		this.dropContent = this.dropBlock.querySelector('.drop-block__content');
		this.content = null;

		this.file = null;

		this.init();
	}



	addActionsBlock(url, filename) {
		this.dropBlock.classList.add('drop-block_upload-file');


		if (this.content.tagName == 'IMG') {
			this.addImgFile(url);
		} else {
			this.addDocumentFile(filename);
		}
	}

	addFile() {
		this.inputFile.addEventListener('change', (e)=> {
			this.uploadFiles(e.target.files);
		});
	}

	removeFile() {

	}

	uploadFiles(files) {
		this.file = files[0];
		const fileReader = new FileReader();

		fileReader.onloadend = ()=> this.addActionsBlock(fileReader.result, this.file.name);

		if (this.file) {
			fileReader.readAsDataURL(this.file);
		}
	}

	renderContentDrop(input) {
		const imgContent = this.dropContent.querySelector('.drop-block__content-img');
		const fileContent = this.dropContent.querySelector('.drop-block__content-file');

		if (input.getAttribute('accept') == 'image/*') {
			this.dropContent.removeChild(fileContent);
			this.content = imgContent;
		} else {
			this.dropContent.removeChild(imgContent);
			this.content = fileContent;
		}
	}

	addImgFile (url) {
		this.content.src = url;
	}

	addDocumentFile(filename) {
		const filenameNode = this.content.querySelector('.drop-block__content-name-file');

		filenameNode.textContent = filename;
	}

	dragEvents() {
		const resetDefault = (e)=> {
			e.preventDefault();
			e.stopPropagation();

			// console.log(e.dataTransfer)
		}

		const getInfoFile = (e)=> {
			resetDefault(e);

			const files = e.dataTransfer.files;

			console.log(files)
			this.uploadFiles(files);
		}

		this.dropBlock.addEventListener('dragenter', resetDefault)
		this.dropBlock.addEventListener('dragleave', resetDefault)

		this.dropBlock.addEventListener('dragover', getInfoFile)
		this.dropBlock.addEventListener('drop', getInfoFile)
	}

	init() {
		this.renderContentDrop(this.inputFile);
		this.addFile();
		this.removeFile();
		this.dragEvents();
	}


}

// const drop = new DropBlock({
// 	selector: '.drop-block'

// })



