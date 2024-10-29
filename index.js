function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
  const mainContent = document.querySelector(".main-content");
  mainContent.style.paddingLeft = sidebar.classList.contains("active")
    ? "270px"
    : "20px";
}

function selectSidebarTab(tabId) {
  document
    .querySelectorAll(".sidebar-item")
    .forEach((item) => item.classList.remove("active"));
  document.getElementById(`tab-${tabId}`)?.classList?.add("active");
}

async function fetchData(tabId, element) {
  const loader = document.getElementById("loader");
  const tableContainer = document.getElementById("tableContainer");
  const tableBody = document.getElementById("table-body");
  const errorMessage = document.getElementById("error-message");

  resetTable(tableBody, errorMessage);

  loader.style.display = "flex";
  tableContainer.style.display = "none";

  try {
    const response = await fetch(
      "https://63ecef2abe929df00cb58085.mockapi.io/todoapp"
    );

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    const shuffledData = data.sort(() => Math.random() - 0.5);

    populateTable(tableBody, shuffledData);

    loader.style.display = "none"; 
    tableContainer.style.display = "block"; 
  } catch (error) {
    handleError(error, loader, tableContainer, errorMessage);
  }


  resetActiveTab(element);
}

function resetTable(tableBody, errorMessage) {
  tableBody.innerHTML = "";
errorMessage?.textContent = "";
}

function populateTable(tableBody, data) {
  console.log(tableBody, data, "table and data");
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.email}</td>
      <td>${item.phone}</td>
      <td>${item.city}</td>
      <td>${item.company}</td>
    `;
    tableBody.appendChild(row);
  });
}

function handleError(error, loader, tableContainer, errorMessage) {
  loader.style.display = "none"; 
  tableContainer.style.display = "none"; 
  errorMessage.textContent = `Error fetching data: ${error.message}`; 
}

function resetActiveTab(element) {
  document
    .querySelectorAll(".tab")
    .forEach((tab) => tab.classList.remove("active"));
  element.classList.add("active");
}


function openModal(modalId) {
  document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      if (modal.style.display === "flex") {
        closeModal(modal.id);
      }
    });
  }
});


async function openModal2() {
  console.log("running here");
  const modal2 = document.getElementById("modal2");
  modal2.style.display = "flex";

  const loader = document.getElementById("modal2-loader");
  const tableContainer = document.getElementById("modal2-tableContainer");
  const tableBody = document.getElementById("modal2-table-body");
  const errorMessage = document.getElementById("modal2-error-message");

  resetTable(tableBody, errorMessage); 
  loader.style.display = "flex";
  tableContainer.style.display = "none";

  try {
    const response = await fetch(
      "https://63ecef2abe929df00cb58085.mockapi.io/todoapp"
    );

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    const shuffledData = data.sort(() => Math.random() - 0.5);


    populateTable(tableBody, shuffledData);

    loader.style.display = "none"; 
    tableContainer.style.display = "block"; 
  } catch (error) {
    handleError(error, loader, tableContainer, errorMessage);
  }
}

document.querySelector(".open-modal-btn:nth-of-type(2)").onclick = openModal2;

function closeModalOnOutsideClick(modalId) {
  const modal = document.getElementById(modalId);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modalId);
    }
  });
}


closeModalOnOutsideClick("modal1");
closeModalOnOutsideClick("modal2");


window.onload = () => {
  const firstTab = document.querySelector(".tab");
  fetchData(firstTab.id, firstTab);
  selectSidebarTab(firstTab.id); 
};
