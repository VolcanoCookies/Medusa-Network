// JavaScript Document

var membersContainer;
var members;

var template = '';

window.addEventListener(
	'DOMContentLoaded',
	function() {
		membersContainer = document.getElementById('members-list');

		var template = Get(
			'https://raw.githubusercontent.com/VolcanoCookies/Medusa-Network/master/templates/memberTemplate.html'
		);

		var jsonText = Get(
			'https://raw.githubusercontent.com/VolcanoCookies/Medusa-Network/master/members.json'
		);

		var regex = new RegExp('(^| )//.*|^$');

		jsonText = jsonText.replace(regex, '');
		jsonText.replace();

		console.log(jsonText);

		members = JSON.parse(jsonText);

		for (i in members.member) {
			var member = members.members[i];

			createMember(member);
		}
	},
	false
);

function Get(yourUrl) {
	var Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open('GET', yourUrl, false);
	Httpreq.send(null);
	return Httpreq.responseText;
}

function createMember(member) {
	var title = member.title;
	var description = member.description;
	var image = member.image;
	var link = member.link;

	var element = document.createElement('project');
	var html = template.trim();
	html = html.replace('member_name', title);
	html = html.replace('member_title', description);
	html = html.replace('member_description', image);
	html = html.replace('member_image', link);

	element.innerHTML = html;

	console.log(
		'Title: ' + title + '\nDesciption: ' + description + '\nImage: ' + image
	);
	console.log(element.innerHTML);

	membersContainer.innerHTML += element.innerHTML;
}
