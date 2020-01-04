// JavaScript Document

var membersContainer;
var members;

var canvas;
var ctx;

var template;
var jsonText;
var placeholder;

var callsProcessed = 0;

$(window).on('ready', function() {
	membersContainer = document.getElementById('members-list');
	background = document.getElementById('members-banner-span');

	getAsync(
		'https://raw.githubusercontent.com/VolcanoCookies/Medusa-Network/master/templates/memberTemplate.html',
		receivedTemplate
	);

	getAsync(
		'https://raw.githubusercontent.com/VolcanoCookies/Medusa-Network/master/members.json',
		receivedList
	);

	getAsync(
		'https://raw.githubusercontent.com/VolcanoCookies/Medusa-Network/master/images/profile%20pictures/Volcano.png',
		receivedPlaceholderPicture
	);

	canvas = document.getElementById('canvas');

	canvas.width = parent.innerWidth;
	canvas.height = 400;
	ctx = canvas.getContext('2d');

	loadImages();
});

function receivedTemplate(response) {
	template = response;
	callsProcessed++;

	if (callsProcessed == 3) populateList();
}

function receivedList(response) {
	jsonText = response;
	callsProcessed++;

	if (callsProcessed == 3) populateList();
}

function receivedPlaceholderPicture(response) {
	placeholder = response;
	callsProcessed++;

	if (callsProcessed == 3) populateList();
}

function populateList() {
	var regex = new RegExp('(^| )//.*|^$');

	jsonText = jsonText.replace(regex, '');
	jsonText.replace();

	members = JSON.parse(jsonText);

	var backgroundString = '';

	for (i in members.members) {
		var member = members.members[i];

		createMember(member);
	}
}

function getAsync(url, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			callback(xmlHttp.responseText);
	};
	xmlHttp.open('GET', url, true); // true for asynchronous
	xmlHttp.send(null);
}

function createMember(member) {
	var name = member.name;
	var title = member.title;
	var description = member.description;
	var picture = member.picture;
	var link = member.link;

	if (picture == '') {
		picture = placeholder;
	}

	var element = document.createElement('project');
	var html = template.trim();
	html = html.replace('member_name', name);
	html = html.replace('member_title', title);
	html = html.replace('member_description', description);
	html = html.replace('member_picture', picture);

	element.innerHTML = html;

	membersContainer.innerHTML += element.innerHTML;
}

//Canvas

var imagesLoaded = [];

function randomPattern(imgWidth, imgHeight, areaWidth, areaHeight) {
	// either set a defined width/height for our images, or use the first one's
	imgWidth = imgWidth || imagesLoaded[0].width;
	imgHeight = imgHeight || imagesLoaded[0].height;
	// restrict the randmoness size by using an areaWidth/Height
	areaWidth = areaWidth || canvas.width;
	areaHeight = areaHeight || canvas.height;

	// create a buffer canvas
	var patternCanvas = canvas.cloneNode(true);
	var patternCtx = patternCanvas.getContext('2d');

	patternCanvas.width = areaWidth;
	patternCanvas.height = areaHeight;

	var xloops = Math.ceil(areaWidth / imgWidth);
	var yloops = Math.ceil(areaHeight / imgHeight);

	for (var xpos = 0; xpos < xloops; xpos++) {
		for (var ypos = 0; ypos < yloops; ypos++) {
			var img = imagesLoaded[Math.floor(Math.random() * imagesLoaded.length)];
			patternCtx.drawImage(
				img,
				xpos * imgWidth,
				ypos * imgHeight,
				imgWidth,
				imgHeight
			);
		}
	}

	// create a pattern from this randomly created image
	return patternCtx.createPattern(patternCanvas, 'repeat');
}

function loadImages() {
	var imagesToLoad = 20;
	for (var i = 0; i < imagesToLoad; i++) {
		var image = new Image();
		image.onload = function() {
			imagesLoaded.push(this);
			if (imagesLoaded.length === imagesToLoad) {
				draw();
			}
		};
		image.src = 'http://lorempixel.com/50/50?' + i;
	}
}

function draw() {
	//create the random pattern (should be moved out of the draw)
	var patt = randomPattern(100, 100);
	ctx.fillStyle = patt;
	ctx.beginPath();
	ctx.rect(0, 0, 2000, 700);
	ctx.fill();
}
