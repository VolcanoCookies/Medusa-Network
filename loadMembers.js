// JavaScript Document

var memberContainer;
var members;

var template = '';

window.addEventListener(
	'DOMContentLoaded',
	function() {
		memberContainer = document.getElementById('members-list');

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

function createMember(project) {
	var title = project.title;
	var description = project.description;
	var image = project.image;
	var link = project.link;

	var element = document.createElement('project');
	var html = template.trim();
	html = html.replace('project_title', title);
	html = html.replace('project_description', description);
	html = html.replace('project_image', image);
	html = html.replace('project_link', link);

	element.innerHTML = html;

	console.log(
		'Title: ' + title + '\nDesciption: ' + description + '\nImage: ' + image
	);
	console.log(element.innerHTML);

	projectContainer.innerHTML += element.innerHTML;
}
