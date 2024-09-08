function addExperience() {
    var experienceContainer = document.getElementById('experience-container');
    if (!experienceContainer)
        return;
    var newExperienceEntry = document.createElement('div');
    newExperienceEntry.className = 'experience-entry';
    newExperienceEntry.innerHTML = "\n        <input type=\"text\" name=\"experience-title\" placeholder=\"Title\" required>\n        <textarea name=\"experience-details\" rows=\"4\" placeholder=\"Details\" required></textarea>\n    ";
    var button = experienceContainer.querySelector('button');
    if (button) {
        experienceContainer.insertBefore(newExperienceEntry, button);
    }
    else {
        experienceContainer.appendChild(newExperienceEntry);
    }
}
function addEducation() {
    var educationContainer = document.getElementById('education-container');
    if (!educationContainer)
        return;
    var newEducationEntry = document.createElement('div');
    newEducationEntry.className = 'education-entry';
    newEducationEntry.innerHTML = "\n        <input type=\"text\" name=\"education-title\" placeholder=\"Title\" required>\n        <textarea name=\"education-details\" rows=\"4\" placeholder=\"Details\" required></textarea>\n    ";
    var button = educationContainer.querySelector('button');
    if (button) {
        educationContainer.insertBefore(newEducationEntry, button);
    }
    else {
        educationContainer.appendChild(newEducationEntry);
    }
}
function generateResume() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var pictureInput = document.getElementById('picture');
    var picture = pictureInput.files ? pictureInput.files[0] : null;
    var skills = document.getElementById('skills').value
        .split(',')
        .map(function (skill) { return skill.trim(); });
    var reader = new FileReader();
    reader.onload = function (e) {
        var _a;
        var imageUrl = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        var experiences = Array.from(document.querySelectorAll('#experience-container .experience-entry'))
            .map(function (entry) {
            var title = entry.querySelector('input[name="experience-title"]').value;
            var details = entry.querySelector('textarea[name="experience-details"]').value;
            return "\n                    <div class=\"resume-section-item\">\n                        <h4>".concat(title, "</h4>\n                        <p>").concat(details, "</p>\n                    </div>\n                ");
        })
            .filter(function (text) { return text.trim() !== ''; });
        var educations = Array.from(document.querySelectorAll('#education-container .education-entry'))
            .map(function (entry) {
            var title = entry.querySelector('input[name="education-title"]').value;
            var details = entry.querySelector('textarea[name="education-details"]').value;
            return "\n                    <div class=\"resume-section-item\">\n                        <h4>".concat(title, "</h4>\n                        <p>").concat(details, "</p>\n                    </div>\n                ");
        })
            .filter(function (text) { return text.trim() !== ''; });
        var resumeHTML = "\n            <div style=\"text-align:center;\">\n                ".concat(imageUrl ? "<img src=\"".concat(imageUrl, "\" alt=\"Profile Picture\">") : '', "\n            </div>\n            <h2>").concat(name, "</h2>\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <p><strong>Phone:</strong> ").concat(phone, "</p>\n            <div class=\"resume-section\">\n                <h3>Experience</h3>\n                ").concat(experiences.join(''), "\n            </div>\n            <div class=\"resume-section\">\n                <h3>Education</h3>\n                ").concat(educations.join(''), "\n            </div>\n            <div class=\"resume-section\">\n                <h3>Skills</h3>\n                <ul class=\"skills\">\n                    ").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n                </ul>\n            </div>\n        ");
        document.getElementById('resume').innerHTML = resumeHTML;
    };
    if (picture) {
        reader.readAsDataURL(picture);
    }
    else {
        generateResumeWithoutImage();
    }
}
function generateResumeWithoutImage() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var skills = document.getElementById('skills').value
        .split(',')
        .map(function (skill) { return skill.trim(); });
    var experiences = Array.from(document.querySelectorAll('#experience-container .experience-entry'))
        .map(function (entry) {
        var title = entry.querySelector('input[name="experience-title"]').value;
        var details = entry.querySelector('textarea[name="experience-details"]').value;
        return "\n                <div class=\"resume-section-item\">\n                    <h4>".concat(title, "</h4>\n                    <p>").concat(details, "</p>\n                </div>\n            ");
    })
        .filter(function (text) { return text.trim() !== ''; });
    var educations = Array.from(document.querySelectorAll('#education-container .education-entry'))
        .map(function (entry) {
        var title = entry.querySelector('input[name="education-title"]').value;
        var details = entry.querySelector('textarea[name="education-details"]').value;
        return "\n                <div class=\"resume-section-item\">\n                    <h4>".concat(title, "</h4>\n                    <p>").concat(details, "</p>\n                </div>\n            ");
    })
        .filter(function (text) { return text.trim() !== ''; });
    var resumeHTML = "\n        <h2>".concat(name, "</h2>\n        <p><strong>Email:</strong> ").concat(email, "</p>\n        <p><strong>Phone:</strong> ").concat(phone, "</p>\n        <div class=\"resume-section\">\n            <h3>Experience</h3>\n            ").concat(experiences.join(''), "\n        </div>\n        <div class=\"resume-section\">\n            <h3>Education</h3>\n            ").concat(educations.join(''), "\n        </div>\n        <div class=\"resume-section\">\n            <h3>Skills</h3>\n            <ul class=\"skills\">\n                ").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n            </ul>\n        </div>\n    ");
    document.getElementById('resume').innerHTML = resumeHTML;
}
function downloadResume() {
    var resumeElement = document.getElementById('resume');
    if (!resumeElement)
        return;
    var name = document.getElementById('name').value;
    var opt = {
        margin: 1,
        filename: "resume-".concat(name, ".pdf"),
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(resumeElement).set(opt).save();
}
