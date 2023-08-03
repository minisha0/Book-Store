const tableBody = document.getElementById("table_body");
const submit_btn = document.getElementById("submit_btn");
const url = "http://localhost:8000/book/";
const access_token = localStorage.getItem("access_token");

if (!access_token) {
  alert("Please login to view this page");
  window.location.replace("admin-login.html");
}

const items = [];
fetch(url + "get_all")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((d) => {
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
  const res = await fetch(`${url}delete?isbn=${isbn} `, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status == 200) {
    alert("Item deleted successfully");
    window.location.reload();
  }
};

// add new post
const handleAddPost = async () => {
  const isbn = document.getElementById("isbn").value;
  const name = document.getElementById("book_name").value;
  const author_name = document.getElementById("author_name").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const image_url = document.getElementById("img").files[0];
  const rating = document.getElementById("rating").value;
  const price = document.getElementById("price").value;
  const published_date = document.getElementById("published_date").value;

  const data = {
    isbn,
    name,
    author_name,
    category,
    description,
    image_url: URL.createObjectURL(image_url),
    rating,
    price,
    published_date,
  };

  const res = await fetch(`${url}add_book`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.status == 200) {
    alert("Book inserted");
    window.location.reload();
  }
};

submit_btn.addEventListener("click", handleAddPost);