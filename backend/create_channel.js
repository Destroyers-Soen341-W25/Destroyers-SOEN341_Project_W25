
// create_channel.js
document.addEventListener("DOMContentLoaded", () => {
    const createChannelForm = document.getElementById("createChannelForm");
    const usersSelect = document.getElementById("usersSelect");
    console.log("Create Channel js loaded");
  
    // Функция для получения списка пользователей и заполнения <select>
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3000/all-users");
        const data = await response.json();
        const users = data.users;
        console.log("Users are", users);
        const currentUser = JSON.parse(localStorage.getItem("user"));
        users.forEach(user => {
          const option = document.createElement("option");
          option.value = user.id;
          option.textContent = user.name;
          // Отмечаем текущего пользователя как выбранного по умолчанию
          if (currentUser && user.id === currentUser.id) {
            option.selected = true;
          }
          usersSelect.appendChild(option);
          console.log("Appending: " + user.name);
        });
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    }
  
    fetchUsers();
  
    createChannelForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const channelName = document.getElementById("channelName").value;
      // Для данного примера задаем channelType как "private"
      const channelType = "private";
      const selectedOptions = Array.from(usersSelect.selectedOptions);
      const selectedUserIds = selectedOptions.map(option => option.value);
      console.log("Selected user IDs:", selectedUserIds);
  
      try {
        // Создаем канал, передавая оба поля
        const createResponse = await fetch("http://localhost:3000/create-channel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ channelName, channelType })
        });
        const createData = await createResponse.json();
        console.log("CreateData:", createData);
        if (createResponse.ok && createData.channel) {
          const channelId = createData.channel.id;
          const currentUser = JSON.parse(localStorage.getItem("user"));
          // Если текущий пользователь не выбран, добавляем его
          if (currentUser && !selectedUserIds.includes(currentUser.id)) {
            selectedUserIds.push(currentUser.id);
          }
          // Назначаем каждого выбранного пользователя в канал
          for (const userId of selectedUserIds) {
            await fetch("http://localhost:3000/assign-user", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userId, channelId })
            });
          }
          alert("Channel created successfully!");
          window.location.href = "channel.html";
        } else {
          alert("Error creating channel");
        }
      } catch (error) {
        console.error("Error creating channel:", error);
        alert("Error creating channel");
      }
    });
  });
  