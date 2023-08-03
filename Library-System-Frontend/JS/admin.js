const tableBody = document.getElementById("table_body");
const form = document.getElementById("form");
const access_token = localStorage.getItem("access_token");

if (!access_token) {
  alert("Please login to view this page");
  window.location.replace("admin-login.html");
}

const url = 'http://localhost:5000/get-profile';

const bearerToken = localStorage.getItem("access_token")
const headers = new Headers();
headers.append('Authorization', `Bearer ${bearerToken}`);
headers.append('Content-Type', 'application/json');

// Perform the POST request using fetch
async function getProfile() {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,

    });

    const data = await response.json();

    if (data.success) {
      if (data.data.type != "admin") {
        window.location.replace("admin-login.html");
      }
    } else {
      window.location.replace("admin-login.html");
    }

  } catch (error) {
    console.error('Fetch error:', error);
  }
}

getProfile()


const items = [];
fetch("http://localhost:5000/books/list")
  .then((res) => res.json())
  .then((data) => {
    data.data.forEach((d) => {
      const { name, isbn } = d;

      items.push({ isbn, name });
    });
    loadTable();
  });

const loadTable = () => {
  items.forEach((item) => {
    const row = document.createElement("tr");
    for (let key in item) {
      const cell = document.createElement("td");
      const cellText = document.createTextNode(item[key]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    const deleteCol = document.createElement("td");
    const deleteText = document.createTextNode("Delete");
    deleteCol.appendChild(deleteText);
    deleteCol.style.color = "red";
    deleteCol.style.cursor = "pointer";

    // set id as book_{isBn}
    deleteCol.addEventListener("click", function () {
      deleteColn(item?.isbn);
    });
    row.appendChild(deleteCol);
    tableBody.appendChild(row);
  });
};

// delete post
const deleteColn = async (isbn) => {
  const url = "http://localhost:5000/books/delete";
  const queryParams = new URLSearchParams({ isbn: isbn });
  const urlWithParams = `${url}?${queryParams}`;

  const bearerToken = localStorage.getItem("access_token")
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${bearerToken}`);
  headers.append('Content-Type', 'application/json');

  try {
    const response = await fetch(urlWithParams, {
      method: 'GET',
      headers: headers,
    });

    const data = await response.json();

    if (data.success) {
      alert("Item deleted successfully");
      window.location.reload();
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }

};

// add new post
const handleAddPost = async (event) => {
  event.preventDefault()

  const isbn = document.getElementById("isbn").value;
  const name = document.getElementById("book_name").value;
  const author_name = document.getElementById("author_name").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const image_url = document.getElementById("image-url").value;
  const price = document.getElementById("price").value;
  const published_date = document.getElementById("published_date").value;

  const bookData = {
    isbn,
    name,
    author_name,
    category,
    description,
    image_url,
    price,
    published_date,
  };


  const url = 'http://localhost:5000/books/add-book';

  const bearerToken = localStorage.getItem("access_token")
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${bearerToken}`);
  headers.append('Content-Type', 'application/json');

  // Perform the POST request using fetch
  async function bookAdd() {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(bookData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Book inserted");
        window.location.reload();
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch process
      console.error('Fetch error:', error);
    }
  }

  bookAdd()
};

form.addEventListener('submit', handleAddPost);
