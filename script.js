"use strict";

// ========================================
// LINKNINJA - FRONTEND FUNCTIONALITY
// ========================================

const urlInput = document.getElementById("urlInput");
const analyzeButton = document.getElementById("analyzeButton");
const message = document.getElementById("message");
const resultBox = document.getElementById("resultBox");
const shortUrlElement = document.getElementById("shortUrl");
const copyButton = document.getElementById("copyButton");
const loginButton = document.getElementById("loginButton");
const settingsLink = document.getElementById("settingsLink");

// Store generated demo links in this browser session.
let generatedLinks = [];

// ========================================
// GENERATE A RANDOM CODE
// ========================================

function generateCode() {
const characters =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

let code = "";

for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(
        Math.random() * characters.length
    );

    code += characters[randomIndex];
}

return code;

}

// ========================================
// VALIDATE URL
// ========================================

function validateUrl(value) {
try {
const input = /^https?:///i.test(value)
? value
: "https://" + value;

    const parsedUrl = new URL(input);

    if (
        !["http:", "https:"].includes(parsedUrl.protocol) ||
        !parsedUrl.hostname.includes(".")
    ) {
        return null;
    }

    return parsedUrl.href;
} catch {
    return null;
}

}

// ========================================
// DISPLAY MESSAGE
// ========================================

function showMessage(text, type = "") {
message.textContent = text;
message.className = "message";

if (type) {
    message.classList.add(type);
}

}

// ========================================
// ANALYZE LINK BUTTON
// ========================================

analyzeButton.addEventListener("click", function () {
const originalUrl = validateUrl(urlInput.value.trim());
if (!originalUrl) {
    resultBox.hidden = true;

    showMessage(
        "Please enter a valid URL, such as https://example.com",
        "error"
    );

    return;
}

const code = generateCode();

// Demo URL only. A backend is required for a real short link.
const shortUrl = "https://lnk.demo/" + code;

generatedLinks.unshift({
    code: code,
    originalUrl: originalUrl,
    shortUrl: shortUrl
});

shortUrlElement.textContent = shortUrl;
shortUrlElement.href = "#";

resultBox.hidden = false;
updateDashboardStats();

showMessage(
    "Demo link generated! A backend is required for a working short URL.",
    "success"
);

console.log("Original URL:", originalUrl);
console.log("Demo short URL:", shortUrl);

});

// Press Enter to analyze the URL.
urlInput.addEventListener("keydown", function (event) {
if (event.key === "Enter") {
analyzeButton.click();
}
});

// ========================================
// COPY LINK BUTTON
// ========================================

copyButton.addEventListener("click", async function () {
const text = shortUrlElement.textContent;

if (!text) {
    showMessage("Generate a link first.", "error");
    return;
}

try {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
    } else {
        const textarea = document.createElement("textarea");

        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";

        document.body.appendChild(textarea);
        textarea.select();

        const copied = document.execCommand("copy");

        textarea.remove();

        if (!copied) {
            throw new Error("Copy failed");
        }
    }

    copyButton.textContent = "COPIED!";

    setTimeout(function () {
        copyButton.textContent = "COPY LINK";
    }, 1500);
} catch {
    showMessage(
        "Copy failed. Please select and copy the link manually.",
        "error"
    );
}

});

// ========================================
// LOGIN BUTTON
// ========================================

loginButton.addEventListener("click", function () {
showMessage(
"Login functionality has not been configured yet.",
"success"
);
});

// ========================================
// SETTINGS LINK
// ========================================

settingsLink.addEventListener("click", function (event) {
event.preventDefault();
showMessage(
    "Settings functionality has not been configured yet.",
    "success"
);

});

// ========================================
// INITIALIZE
// ========================================

console.log("LinkNinja JavaScript loaded successfully.");

// ========================================
// SIDEBAR PAGE NAVIGATION
// ========================================

const navigationLinks = document.querySelectorAll(
    ".navigation a[data-page]"
);

const dashboardSections = document.querySelectorAll(
    '[data-dashboard-section="dashboard"]'
);

const linksPage = document.getElementById("linksPage");
const analyticsPage = document.getElementById("analyticsPage");
const riskPage = document.getElementById("riskPage");

const pageTitle = document.querySelector(".page-header h1");
const pageHeading = document.querySelector(".page-header .small-heading");
const welcomeText = document.querySelector(".welcome-text");

function showPage(page) {
    // Hide every dashboard section first.
    dashboardSections.forEach(function (section) {
        section.style.display = "none";
    });

    linksPage.hidden = false;
    analyticsPage.hidden = false;
    riskPage.hidden = false;    

    // Update the active sidebar item.
    navigationLinks.forEach(function (link) {
        link.classList.toggle(
            "active",
            link.dataset.page === page
        );
    });

    // Show the selected page.
    if (page === "dashboard") {
        dashboardSections.forEach(function (section) {
            section.style.display = "";
        });

        pageTitle.textContent = "Dashboard";
        pageHeading.textContent = "OVERVIEW";
        welcomeText.textContent =
            "Monitor your link activity and traffic insights.";
    }

    if (page === "links") {
        linksPage.style.display = "";

        pageTitle.textContent = "Links";
        pageHeading.textContent = "LINK LIBRARY";
        welcomeText.textContent =
            "View and manage your generated demo links.";

        renderLinksPage();
    }

    if (page === "analytics") {
        analyticsPage.style.display = "";

        pageTitle.textContent = "Analytics";
        pageHeading.textContent = "PERFORMANCE";
        welcomeText.textContent =
            "View your local link statistics.";

        updateAnalyticsPage();
    }

    if (page === "risk") {
        riskPage.style.display = "";

        pageTitle.textContent = "Risk Analysis";
        pageHeading.textContent = "SECURITY";
        welcomeText.textContent =
            "Check URLs for potentially suspicious patterns.";
    }
}

// Handle sidebar clicks.
navigationLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        showPage(link.dataset.page);
    });
});


function showPage(page) {

    // Hide every dashboard section first.
    dashboardSections.forEach(function (section) {
        section.style.display = "none";
    });

    // Hide all secondary pages first.
    linksPage.hidden = true;
    analyticsPage.hidden = true;
    riskPage.hidden = true;

    // Update the active sidebar item.
    navigationLinks.forEach(function (link) {
        link.classList.toggle(
            "active",
            link.dataset.page === page
        );
    });

    // Show the selected page.
    if (page === "dashboard") {
        dashboardSections.forEach(function (section) {
            section.style.display = "";
        });

        pageTitle.textContent = "Dashboard";
        pageHeading.textContent = "OVERVIEW";
        welcomeText.textContent =
            "Monitor your link activity and traffic insights.";
    }

    if (page === "links") {
        linksPage.hidden = false;

        pageTitle.textContent = "Links";
        pageHeading.textContent = "LINK LIBRARY";
        welcomeText.textContent =
            "View and manage your generated demo links.";

        renderLinksPage();
    }

    if (page === "analytics") {
        analyticsPage.hidden = false;

        pageTitle.textContent = "Analytics";
        pageHeading.textContent = "PERFORMANCE";
        welcomeText.textContent =
            "View your local link statistics.";

        updateAnalyticsPage();
    }

    if (page === "risk") {
        riskPage.hidden = false;

        pageTitle.textContent = "Risk Analysis";
        pageHeading.textContent = "SECURITY";
        welcomeText.textContent =
            "Check URLs for potentially suspicious patterns.";
    }
}

// Handle sidebar clicks.
navigationLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        showPage(link.dataset.page);
    });
});

// ========================================
// RENDER GENERATED LINKS
// ========================================

function renderLinksPage() {
    const linksList = document.getElementById("linksList");

    linksList.replaceChildren();

    if (generatedLinks.length === 0) {
        const emptyMessage = document.createElement("p");

        emptyMessage.textContent =
            "No links generated yet. Go to Dashboard to analyze a URL.";

        linksList.appendChild(emptyMessage);
        return;
    }

    generatedLinks.forEach(function (link, index) {
        const item = document.createElement("div");
        const original = document.createElement("p");
        const shortLink = document.createElement("a");
        const copyButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        item.className = "card";

        original.textContent = "Original URL: " + link.originalUrl;

        shortLink.textContent = link.shortUrl;
        shortLink.href = "#";

        copyButton.type = "button";
        copyButton.textContent = "COPY LINK";

        copyButton.addEventListener("click", async function () {
            try {
                await navigator.clipboard.writeText(link.shortUrl);
                copyButton.textContent = "COPIED!";

                setTimeout(function () {
                    copyButton.textContent = "COPY LINK";
                }, 1500);
            } catch {
                window.prompt("Copy this demo link:", link.shortUrl);
            }
        });

        deleteButton.type = "button";
        deleteButton.textContent = "DELETE";

        deleteButton.addEventListener("click", function () {
            generatedLinks.splice(index, 1);
            renderLinksPage();
        });

        item.append(original, shortLink, copyButton, deleteButton);
        linksList.appendChild(item);
    });
    updateDashboardStats();
}

// ========================================
// UPDATE DEMO ANALYTICS
// ========================================

function updateAnalyticsPage() {
    const linkCount = document.getElementById(
        "analyticsLinkCount"
    );

    const destinationCount = document.getElementById(
        "analyticsDestinationCount"
    );

    const uniqueDestinations = new Set(
        generatedLinks.map(function (link) {
            return link.originalUrl;
        })
    );  

    linkCount.textContent = generatedLinks.length;
    destinationCount.textContent = uniqueDestinations.size;
}

function updateDashboardStats() {
    const totalClicks = document.getElementById("totalClicks");
    const humanTraffic = document.getElementById("humanTraffic");
    const botTraffic = document.getElementById("botTraffic");
    const trafficRisk = document.getElementById("trafficRisk");

    // Count links actually generated in this application.
    if (totalClicks) {
        totalClicks.textContent = generatedLinks.length;
    }

    // Actual human and bot traffic are not tracked yet.
    if (humanTraffic) {
        humanTraffic.textContent = "N/A";
    }

    if (botTraffic) {
        botTraffic.textContent = "N/A";
    }

    // Traffic risk cannot be assessed without traffic data.
    if (trafficRisk) {
        trafficRisk.textContent = "UNKNOWN";
        trafficRisk.className = "";
    }
}


// Refresh the Links list whenever a new demo link is generated.
analyzeButton.addEventListener("click", function () {
    renderLinksPage();
    updateAnalyticsPage();
});

// Start on the Dashboard.
showPage("dashboard");
// ========================================
// RISK ANALYSIS
// ========================================

const riskUrlInput = document.getElementById("riskUrlInput");
const riskAnalyzeButton = document.getElementById("riskAnalyzeButton");
const riskMessage = document.getElementById("riskMessage");

riskAnalyzeButton.addEventListener("click", function () {
    const value = riskUrlInput.value.trim();

    if (!value) {
        riskMessage.textContent = "Please enter a URL to check.";
        riskMessage.className = "message error";
        return;
    }

    const normalizedUrl = /^https?:\/\//i.test(value)
        ? value
        : "https://" + value;

    let parsedUrl;

    try {
        parsedUrl = new URL(normalizedUrl);
    } catch {
        riskMessage.textContent = "Invalid URL. Please enter a valid address.";
        riskMessage.className = "message error";
        return;
    }

    const warnings = [];

    if (parsedUrl.protocol !== "https:") {
        warnings.push("The URL does not use HTTPS.");
    }

    if (parsedUrl.hostname.includes("xn--")) {
        warnings.push("The domain contains an internationalized hostname.");
    }

    if (parsedUrl.hostname.split(".").some(part => part.length > 30)) {
        warnings.push("The hostname contains an unusually long section.");
    }

    if (parsedUrl.username || parsedUrl.password) {
        warnings.push("The URL contains embedded login credentials.");
    }

    if (warnings.length > 0) {
        riskMessage.textContent =
            "Potential warning signs:\n" + warnings.join("\n");
        riskMessage.className = "message error";
    } else {
        riskMessage.textContent =
            "No obvious warning signs detected by these basic checks. This does not guarantee the URL is safe.";
        riskMessage.className = "message success";
    }
});