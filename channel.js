
document.addEventListener("DOMContentLoaded", () => {

    const channelNameEl = document.getElementById("channelName");
    const assignedUserEl = document.getElementById("assignedUser");
    

    

  

  async function fetch_channels(username) {
    try {
      const response = await fetch("http://localhost:3000/get-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username })
      });


      const data = await response.json();
      console.log(data);

      const current_user_id = data.user.id;
      console.log("ID IS: ", current_user_id );


      if (data.user.role === "admin") {
        addAdminButton(); // Добавляем кнопку для админа
    }

      const response2 = await fetch("http://localhost:3000/get-user-channels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current_user_id })
    });

          const data2 = await response2.json();
          console.log(data2);
      
          
          if (Array.isArray(data2.channels)) {
            const channelNames = data2.channels.map(channel => channel.channelname);
            console.log("Channel Names:", channelNames);
    
 
            channelNameEl.textContent = channelNames.length > 0 ? channelNames.join(', ') : "No channels assigned";
          } else {
            console.error("Data2 is not an array:", data2);
            channelNameEl.textContent = "Error fetching channels";
          }
          




  } catch (error) {
      console.error("Error assigning user:", error);
  }
    


}



function addAdminButton() {
  const adminButton = document.createElement("button");
  adminButton.textContent = "Go to Admin Page";
  adminButton.id = "adminPage";
  adminButton.addEventListener("click", function() {
      window.location.href = "admin.html";
  });

  document.body.appendChild(adminButton);
}


    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("No user logged in");
      window.location.href = "Webpage.html";
      return;
    }
  
    document.getElementById("openChats").addEventListener("click", function(){
      window.location.href = `chats.html?our_id=${user.id}`;
    });
  
    document.getElementById("openChannels").addEventListener("click", function(){
      window.location.href = `all_channels.html?our_id=${user.id}`;
    });

    assignedUserEl.textContent = user.name;
    
      fetch_channels(user.name);

  // channel.js (добавьте в конце файла)
document.getElementById("createChannel").addEventListener("click", function(){
  window.location.href = "create_channel.html";
});



});