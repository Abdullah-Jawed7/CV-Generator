function addExperience(): void {
    const experienceContainer = document.getElementById('experience-container') as HTMLDivElement;
    if (!experienceContainer) return;

    const newExperienceEntry = document.createElement('div');
    newExperienceEntry.className = 'experience-entry';
    newExperienceEntry.innerHTML = `
        <input type="text" name="experience-title" placeholder="Title" required>
        <textarea name="experience-details" rows="4" placeholder="Details" required></textarea>
    `;
    const button = experienceContainer.querySelector('button');
    if (button) {
        experienceContainer.insertBefore(newExperienceEntry, button);
    } else {
        experienceContainer.appendChild(newExperienceEntry);
    }
}

function addEducation(): void {
    const educationContainer = document.getElementById('education-container') as HTMLDivElement;
    if (!educationContainer) return;

    const newEducationEntry = document.createElement('div');
    newEducationEntry.className = 'education-entry';
    newEducationEntry.innerHTML = `
        <input type="text" name="education-title" placeholder="Title" required>
        <textarea name="education-details" rows="4" placeholder="Details" required></textarea>
    `;
    const button = educationContainer.querySelector('button');
    if (button) {
        educationContainer.insertBefore(newEducationEntry, button);
    } else {
        educationContainer.appendChild(newEducationEntry);
    }
}

function generateResume(): void {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const pictureInput = document.getElementById('picture') as HTMLInputElement;
    const picture = pictureInput.files ? pictureInput.files[0] : null;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value
        .split(',')
        .map(skill => skill.trim());

    const reader = new FileReader();
    reader.onload = function(e: ProgressEvent<FileReader>) {
        const imageUrl = e.target?.result as string;

        const experiences = Array.from(document.querySelectorAll('#experience-container .experience-entry'))
            .map(entry => {
                const title = (entry.querySelector('input[name="experience-title"]') as HTMLInputElement).value;
                const details = (entry.querySelector('textarea[name="experience-details"]') as HTMLTextAreaElement).value;
                return `
                    <div class="resume-section-item">
                        <h4>${title}</h4>
                        <p>${details}</p>
                    </div>
                `;
            })
            .filter(text => text.trim() !== '');

        const educations = Array.from(document.querySelectorAll('#education-container .education-entry'))
            .map(entry => {
                const title = (entry.querySelector('input[name="education-title"]') as HTMLInputElement).value;
                const details = (entry.querySelector('textarea[name="education-details"]') as HTMLTextAreaElement).value;
                return `
                    <div class="resume-section-item">
                        <h4>${title}</h4>
                        <p>${details}</p>
                    </div>
                `;
            })
            .filter(text => text.trim() !== '');

        const resumeHTML = `
            <div style="text-align:center;">
                ${imageUrl ? `<img src="${imageUrl}" alt="Profile Picture">` : ''}
            </div>
            <h2>${name}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <div class="resume-section">
                <h3>Experience</h3>
                ${experiences.join('')}
            </div>
            <div class="resume-section">
                <h3>Education</h3>
                ${educations.join('')}
            </div>
            <div class="resume-section">
                <h3>Skills</h3>
                <ul class="skills">
                    ${skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </div>
        `;

        document.getElementById('resume')!.innerHTML = resumeHTML;
    };

    if (picture) {
        reader.readAsDataURL(picture);
    } else {
        generateResumeWithoutImage();
    }
}

function generateResumeWithoutImage(): void {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value
        .split(',')
        .map(skill => skill.trim());

    const experiences = Array.from(document.querySelectorAll('#experience-container .experience-entry'))
        .map(entry => {
            const title = (entry.querySelector('input[name="experience-title"]') as HTMLInputElement).value;
            const details = (entry.querySelector('textarea[name="experience-details"]') as HTMLTextAreaElement).value;
            return `
                <div class="resume-section-item">
                    <h4>${title}</h4>
                    <p>${details}</p>
                </div>
            `;
        })
        .filter(text => text.trim() !== '');

    const educations = Array.from(document.querySelectorAll('#education-container .education-entry'))
        .map(entry => {
            const title = (entry.querySelector('input[name="education-title"]') as HTMLInputElement).value;
            const details = (entry.querySelector('textarea[name="education-details"]') as HTMLTextAreaElement).value;
            return `
                <div class="resume-section-item">
                    <h4>${title}</h4>
                    <p>${details}</p>
                </div>
            `;
        })
        .filter(text => text.trim() !== '');

    const resumeHTML = `
        <h2>${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <div class="resume-section">
            <h3>Experience</h3>
            ${experiences.join('')}
        </div>
        <div class="resume-section">
            <h3>Education</h3>
            ${educations.join('')}
        </div>
        <div class="resume-section">
            <h3>Skills</h3>
            <ul class="skills">
                ${skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
        </div>
    `;

    document.getElementById('resume')!.innerHTML = resumeHTML;
}

function downloadResume(): void {
    const resumeElement = document.getElementById('resume') as HTMLElement;
    if (!resumeElement) return;

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const opt = {
        margin: 1,
        filename: `resume-${name}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(resumeElement).set(opt).save();
}

