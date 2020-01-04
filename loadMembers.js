// JavaScript Document

var membersContainer;
var members;

var background;

var template;
var jsonText;

window.addEventListener(
	'DOMContentLoaded',
	function() {
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
	},
	false
);

function receivedTemplate(response) {
	template = response;

	if (jsonText != undefined) {
		populateList();
	}
}

function receivedList(response) {
	jsonText = response;

	if (template != undefined) {
		populateList();
	}
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

		backgroundString += 'url("' + member.picture + '"), ';
	}

	backgroundString = backgroundString.substring(0, backgroundString.length - 2);

	background.style.backgroundImage = backgroundString;

	console.log(backgroundString);

	console.log(background.style.backgroundImage);
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

	var element = document.createElement('project');
	var html = template.trim();
	html = html.replace('member_name', name);
	html = html.replace('member_title', title);
	html = html.replace('member_description', description);
	html = html.replace('member_picture', picture);

	element.innerHTML = html;

	membersContainer.innerHTML += element.innerHTML;
}
