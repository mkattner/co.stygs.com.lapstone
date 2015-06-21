var editor = {
	languageObject : {},
	mergedLanguageObject : {},
	defaultLanguage : null,
	inputId : 1,
	loadLanguageFiles : function() {
		var url;
		url = "../../js/plugin/plugin.MultilanguageIso639_3.json";
		$.ajax({
			dataType : "json",
			url : url,
			async : false
		}).done(function(json) {
			editor.defaultLanguage = json.defaultLanguage;
			$.each(json.availableLanguages, function(index, languageName) {
				var url;
				url = "../../files/language/" + languageName + ".json";
				$.ajax({
					dataType : "json",
					url : url,
					async : false
				}).done(function(json) {
					editor.languageObject[languageName] = json;
				}).fail(function() {
					alert("Failed to load: " + url);
				});
			});
		}).fail(function() {
			alert("Failed to load: " + url);
		});
	},
	mergeAll : function(primaryLanguage) {

		$.each(editor.languageObject, function(languageName, languageObject) {
			$.extend(true, editor.mergedLanguageObject, languageObject);

		});

		if (primaryLanguage != undefined)
			$.extend(true, editor.mergedLanguageObject, editor.languageObject[primaryLanguage]);
	}
}
$(document).on("change", "#changePriamry", function() {
	var lang = $(this).val();
	editor.mergeAll(lang);
	// alert(JSON.stringify(editor.mergedLanguageObject, null, '\t'))
	$('#output').html(JSON.stringify(editor.mergedLanguageObject, null, '\t'));

});

// editor
$(document).on("click focus", "#divEditor input.translation", function(event) {
	var translationId, contextId, divTranslation, divTranslationOverview;

	contextId = $(this).attr('data-contextid');
	translationId = $(this).attr('data-translationid');
	languageId = $(this).attr('data-languageid');

	divTranslation = $(this).parent();

	divTranslation.find('input').addClass("active");

	$('#divFixedEdit .translationOveview').remove();
	divTranslationOverview = $('<div class="translationOveview">');

	var textareaTranslation, inputLanguageId, divTranslationContainer, inputTranslation;

	divTranslationContainer = $('<div class="translationContainer"></div>')
	inputTranslation = divTranslation.find('input[data-languageid=' + languageId + ']');
	textareaTranslation = $('<textarea></textarea>');
	textareaTranslation.text(inputTranslation.val());
	textareaTranslation.attr('data-id', inputTranslation.attr('id'));
	textareaTranslation.addClass('translation');

	divTranslationContainer.append('<h1><span>Context:</span> ' + contextId + '</h1>');
	divTranslationContainer.append('<h2><span>Translation Id:</span> ' + translationId + '</h2>');
	divTranslationContainer.append(textareaTranslation);

	divTranslationOverview.append(divTranslationContainer);

	$('#divFixedEdit').prepend(divTranslationOverview);
	$('[data-id=' + $(this).attr('id') + ']').attr('tabindex', $(this).attr('id'));
});

$(document).on("keyup", "#divEditor input.translation", function(event) {
	var id = $(this).attr('id');
	$('[data-id=' + id + ']').val($(this).val());
});

$(document).on("change", "#divEditor input.translation", function(event) {
	divTranslation = $(this).parent();
	divTranslation.find('input').addClass("edited");
});

$(document).on("blur", "#divEditor input.translation", function(event) {
	divTranslation = $(this).parent();
	divTranslation.find('input').removeClass("active");
});

// fixed
$(document).on("keyup", "#divFixedEdit textarea.translation", function(event) {
	var id = $(this).attr('data-id');
	$('#' + id).val($(this).val());
});

$(document).on("click focus", "#divFixedEdit textarea.translation", function(event) {
	var id = $(this).attr('data-id');
	$('#' + id).parent().find('input').addClass("active");
});

$(document).on("change", "#divFixedEdit textarea.translation", function(event) {
	var id = $(this).attr('data-id');
	$('#' + id).parent().find('input').addClass("edited");
});

$(document).on("blur", "#divFixedEdit textarea.translation", function(event) {
	var id = $(this).attr('data-id');
	$('#' + id).parent().find('input').removeClass("active");
});

$(document).ready(
		function() {
			editor.loadLanguageFiles();
			editor.mergeAll(editor.defaultLanguage);

			// column headlines
			var divHeader = $('<div id="divHeader"></div>'), divFirst = $('<div id="divFirstHeader" class="row"></div>'), divSecond = $('<div id="divSecondHeader" class="row"></div>');
			divFirst.append('<h1 class="column">language id</h1>');
			$.each(editor.languageObject, function(languageId, languageObject) {
				divFirst.append('<h1 class="column">' + languageId + '</h1>');
			});

			divSecond.append('<div class="column"><p>&nbsp;</p></div>');
			$.each(editor.languageObject, function(languageId, languageObject) {
				var divOperation = $('<div class="column" data-languageid="' + languageId + '"></div>');
				divOperation.append('<a href="#" class="reset"><img alt="reset" title="reset" src="img/reset.png" /></a>');
				divOperation.append('<a href="#" class="deploy"><img alt="deploy" title="deploy" src="img/deploy.png" /></a>');
				divOperation.append('<a href="#" class="export"><img alt="export" title="export" src="img/export.png" /></a>');
				divSecond.append(divOperation);
			});

			divHeader.append(divFirst);
			divHeader.append(divSecond);
			$('#divFixedHeader').append(divHeader);

			// each context
			$.each(editor.mergedLanguageObject, function(contextId, contextObject) {
				console.log("Context: " + contextId);

				if (typeof contextObject === 'object') {
					var divContext;

					divContext = $('<div class="divContext">');
					divContextOperations = $('<div class="divContextOperations row">');

					divContextOperations.append('<h1 class="column">' + contextId + '</h1>');
					$.each(editor.languageObject, function(languageId, languageObject) {
						divContextOperations.append('<h1 class="column">&nbsp;</h1>');
					});

					divContext.append(divContextOperations);
					$('#divEditor').append(divContext);

					// each languageid
					$.each(contextObject, function(translationId, translationValue) {
						console.log("  Translation: " + translationId);

						var divTranslation, inputTranslationId;

						divTranslation = $('<div class="divTranslation row" data-contextid="' + contextId + '" data-id="' + translationId + '">');
						inputTranslationId = $('<input type="text" id="' + editor.inputId++ + '" value="' + translationId + '" disabled="disabled"></input>');
						inputTranslationId.addClass('column');

						divTranslation.append(inputTranslationId);

						divContext.append(divTranslation);

						// each language
						$.each(editor.languageObject, function(languageId, languageObject) {
							console.log("    Language: " + languageId);
							var inputTranslation = $('<input type="text" id="' + editor.inputId + '" class="translation" tabindex="' + editor.inputId + '" data-contextid="' + contextId + '" data-languageid="' + languageId + '" data-translationid="'
									+ translationId + '"></input>');
							editor.inputId++;
							divTranslation.append(inputTranslation);

							if (languageObject[contextId] == undefined) {
								inputTranslation.val("");
								inputTranslation.attr("data-original", "");
								inputTranslation.addClass("notranslation");
							} else {
								if (languageObject[contextId][translationId] == undefined) {
									inputTranslation.val("");
									inputTranslation.attr("data-original", "");
									inputTranslation.addClass("notranslation");
								} else {
									inputTranslation.val(languageObject[contextId][translationId]);
									inputTranslation.attr("data-original", languageObject[contextId][translationId]);
								}
							}
							inputTranslation.addClass("column");
						});

					});
				}
			});
			$('body').css('margin-top', $('#divFixedHeader').css("height"));
		});

// shortcuts
$(document).on('keydown', 'input, textarea', function(e) {
	// You may replace `c` with whatever key you want
	
	if ((e.ctrlKey || e.metaKey) && (String.fromCharCode(e.which) === '1')) {
		e.preventDefault();
		$('#divFixedEdit').css('display', 'block');
		$('[data-id=' + $(this).attr('id') + ']').focus();
		$('[data-id=' + $(this).attr('id') + ']').attr('tabindex', $(this).attr('id'));
	} else if ((e.ctrlKey || e.metaKey) && (String.fromCharCode(e.which) === '2')) {
		e.preventDefault();
		var id = $(this).attr('data-id');
		$('#' + id).focus();
		$('#divFixedEdit').css('display', 'none');

	}
});

// actions
$(document).on('click', '.export', function(event) {
	var languageId, exportObject = {};
	languageId = $(this).parent().attr("data-languageid");

	if (confirm('Do you want to export and download the language file?')) {
		$('#divEditor').find('input[data-languageid=' + languageId + ']').each(function() {

			if (exportObject[$(this).attr('data-contextid')] == undefined) {
				exportObject[$(this).attr('data-contextid')] = {};
			}

			exportObject[$(this).attr('data-contextid')][$(this).attr('data-translationid')] = $(this).val();
		});

		$(this).attr({
			'download' : languageId + '.json',
			'href' : 'data:application/csv;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObject)),
			'target' : '_blank'
		});
	}
});

$(document).on('click', '.reset', function(event) {
	var languageId = $(this).parent().attr("data-languageid");
	if (confirm('Do you realy want to reset all changes for this language? It cannot be undone!')) {
		$('#divEditor').find('input[data-languageid=' + languageId + ']').each(function() {
			$(this).val($(this).attr('data-original'));
		});
	}
});

$(document).on('click', '.deploy', function(event) {
	var languageId, exportObject = {};
	languageId = $(this).parent().attr("data-languageid");
	if (confirm('Do you realy want to deploy the translations to the development system?')) {
		$('#divEditor').find('input[data-languageid=' + languageId + ']').each(function() {

			if (exportObject[$(this).attr('data-contextid')] == undefined) {
				exportObject[$(this).attr('data-contextid')] = {};
			}

			exportObject[$(this).attr('data-contextid')][$(this).attr('data-translationid')] = $(this).val();
		});

		$.ajax({
			type : 'POST',
			url : 'deploy.php',
			async : true,
			data : 'languageId=' + languageId + '&json=' + JSON.stringify(exportObject)
		}).done(function(data) {
			alert('Successful: ' + data);
		}).fail(function() {
			alert('fail');
		});
	}
});

$(document).on('scroll', function() {
	$('#divFixedHeader').css({
		'left' : -$(this).scrollLeft() + 5

	});
});
