

let allIssues = [];

const manageSpinner = (status) => {
  const spinner = document.getElementById("spinner");
  const issueContainer = document.getElementById("issue-container");

  if (status) {
    spinner.classList.remove("hidden");
    issueContainer.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    issueContainer.classList.remove("hidden");
  }
};

const removeActive = () => {
  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));
};

const getPriorityBadge = (priority) => {
  const value = priority ? priority.toLowerCase() : "low";

  if (value === "high") {
    return `<span class="px-4 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-500">HIGH</span>`;
  } else if (value === "medium") {
    return `<span class="px-4 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-600">MEDIUM</span>`;
  } else {
    return `<span class="px-4 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-500">LOW</span>`;
  }
};

const getTopBorderClass = (priority) => {
  const value = priority ? priority.toLowerCase() : "low";

  if (value === "high") return "top-high";
  if (value === "medium") return "top-medium";
  return "top-low";
};

const getStatusBadge = (status) => {
  const value = status ? status.toLowerCase() : "open";

  if (value === "open") {
    return `<span class="px-3 py-1 rounded-full text-sm font-semibold bg-green-500 text-white">Opened</span>`;
  } else {
    return `<span class="px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-600">Closed</span>`;
  }
};

const getTags = (issue) => {
  let tags = [];

  if (issue.labels && Array.isArray(issue.labels)) {
    tags = issue.labels;
  } else if (issue.tags && Array.isArray(issue.tags)) {
    tags = issue.tags;
  } else if (issue.label) {
    tags = [issue.label];
  }

  if (tags.length === 0) {
    return `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">NO TAG</span>`;
  }

  return tags
    .map((tag) => {
      const text = String(tag).toUpperCase();

      if (text.includes("BUG")) {
        return `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-500">${text}</span>`;
      } else if (text.includes("HELP")) {
        return `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-600">${text}</span>`;
      } else if (text.includes("ENHANCEMENT")) {
        return `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-600">${text}</span>`;
      } else {
        return `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">${text}</span>`;
      }
    })
    .join("");
};

const formatStatus = (status) => {
  if (!status) return "open";
  return String(status).toLowerCase();
};

const formatDate = (dateString) => {
  if (!dateString) return "No Date";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("en-GB");
};

const displayIssueDetails = (issue) => {
  const detailsBox = document.getElementById("details-container");

  detailsBox.innerHTML = `
    <div class="space-y-6">
      <h2 class="text-4xl font-semibold text-gray-800">
        ${issue.title || "No Title"}
      </h2>

      <div class="flex flex-wrap items-center gap-3 text-sm text-gray-500">
        ${getStatusBadge(issue.status)}
        <span>•</span>
        <span>Opened by ${issue.author || "Unknown"}</span>
        <span>•</span>
        <span>${formatDate(issue.createdAt || issue.date)}</span>
      </div>

      <div class="flex flex-wrap gap-3">
        ${getTags(issue)}
      </div>

      <p class="text-[28px] leading-10 text-slate-500">
        ${issue.description || "No description available"}
      </p>

      <div class="bg-slate-50 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p class="text-3xl text-slate-500 mb-2">Assignee:</p>
          <p class="text-3xl font-semibold text-slate-800">
            ${issue.author || "Unknown"}
          </p>
        </div>

        <div>
          <p class="text-3xl text-slate-500 mb-2">Priority:</p>
          <div>
            ${getPriorityBadge(issue.priority)}
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("issue_modal").showModal();
};

const loadIssueDetail = async (id) => {
  try {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const details = await res.json();
    displayIssueDetails(details.data);
  } catch (error) {
    console.error("Issue detail load error:", error);
  }
};

const displayIssues = (issues) => {
  const issueContainer = document.getElementById("issue-container");
  const issueCount = document.getElementById("issue-count");

  issueContainer.innerHTML = "";
  issueCount.innerText = `${issues.length} Issues`;

  if (issues.length === 0) {
    issueContainer.innerHTML = `
      <div class="col-span-full text-center py-16">
        <h2 class="text-2xl font-bold text-gray-700 mb-2">No Issues Found</h2>
        <p class="text-gray-500">Try another filter or search</p>
      </div>
    `;
    manageSpinner(false);
    return;
  }

  issues.forEach((issue) => {
    const card = document.createElement("div");

    const title = issue.title || "No Title";
    const description = issue.description || "No description available";
    const priority = issue.priority || "low";

    card.innerHTML = `
      <div
        onclick="loadIssueDetail(${issue.id})"
        class="issue-card ${getTopBorderClass(priority)} bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-lg transition duration-200 h-full"
      >
        <div class="flex items-start justify-between gap-2 mb-3">
          <div class="w-5 h-5 rounded-full border border-violet-300 text-violet-500 flex items-center justify-center text-[10px]">
            <i class="fa-solid fa-check"></i>
          </div>
          ${getPriorityBadge(priority)}
        </div>

        <h3 class="text-[16px] font-semibold text-[#1F2937] leading-5 mb-3">
          ${title}
        </h3>

        <p class="text-[12px] text-[#64748B] leading-3 mb-4">
          ${description}
        </p>

        <div class="flex flex-wrap gap-2 mb-5">
          ${getTags(issue)}
        </div>

        <div class="border-t border-gray-100 pt-3 text-sm text-slate-400 leading-6">
          <p>#${issue.id || "0"} by ${issue.author || "unknown"}</p>
          <p>${formatDate(issue.createdAt || issue.date)}</p>
        </div>
      </div>
    `;

    issueContainer.append(card);
  });

  manageSpinner(false);
};

const loadIssues = async () => {
  try {
    manageSpinner(true);

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const json = await res.json();

    allIssues = json.data || [];
    displayIssues(allIssues);
  } catch (error) {
    console.error("Issues load error:", error);
    manageSpinner(false);
  }
};

const filterIssues = (type) => {
  removeActive();
  document.getElementById(`tab-${type}`).classList.add("active");

  if (type === "all") {
    displayIssues(allIssues);
    return;
  }

  const filtered = allIssues.filter(
    (issue) => formatStatus(issue.status) === type
  );

  displayIssues(filtered);
};

document.getElementById("btn-search").addEventListener("click", async () => {
  try {
    removeActive();
    document.getElementById("tab-all").classList.add("active");

    const input = document.getElementById("input-search");
    const searchValue = input.value.trim();

    if (searchValue === "") {
      displayIssues(allIssues);
      return;
    }

    manageSpinner(true);

    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`
    );
    const data = await res.json();

    displayIssues(data.data || []);
  } catch (error) {
    console.error("Search error:", error);
    manageSpinner(false);
  }
});

document.getElementById("input-search").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    document.getElementById("btn-search").click();
  }
});

loadIssues();