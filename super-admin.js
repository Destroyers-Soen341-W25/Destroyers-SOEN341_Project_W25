document.addEventListener("DOMContentLoaded", () => {
    const createChannelForm = document.getElementById("create-channel-form");
    const removeChannelButton = document.getElementById("remove-channel");
    const assignUserForm = document.getElementById("assign-user-form");
    const deassignUserForm = document.getElementById("deassign-user-form");
    const promoteUserForm = document.getElementById("promote-user-form");
    const demoteUserForm = document.getElementById("demote-user-form");
    const channelsDropdown = document.getElementById("channels-dropdown");
    const channelSelect = document.getElementById("channel-select");
    const usersDropdown = document.getElementById('user-select');
    const channelDeassign = document.getElementById("channel-deassign");
    const userDeassign = document.getElementById("user-deassign");
    const userPromote = document.getElementById("promote-user");
    const userDemote = document.getElementById("demote-user");



    async function fetchUsers() {
        try {
            console.log("Fetching users...");
            const response = await fetch("http://localhost:3000/all-users"); 
            const data = await response.json();
            renderUserSelects(data.users); 
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }
    
    function renderUserSelects(users) {
        usersDropdown.innerHTML = "";
        userDeassign.innerHTML="";
    
        users.forEach(user => {
            const option = new Option(user.name, user.id);  
            usersDropdown.add(option.cloneNode(true));  
            userDeassign.add(option.cloneNode(true));
            userPromote.add(option.cloneNode(true));
            userDemote.add(option.cloneNode(true));
            
        });
    }


    async function fetchChannels() {
        try {
            console.log("Fetching...");
            const response = await fetch("http://localhost:3000/all-channels");
            const data = await response.json();
            renderChannelSelects(data.channels);
        } catch (error) {
            console.error("Error fetching channels:", error);
        }
    }

    function renderChannelSelects(channels) {
        channelsDropdown.innerHTML = "";
        channelSelect.innerHTML = "";
        channelDeassign.innerHTML = "";

        channels.forEach(channel => {
            const option = new Option(channel.channelname, channel.id);
            channelsDropdown.add(option.cloneNode(true));
            channelSelect.add(option.cloneNode(true));
            channelDeassign.add(option.cloneNode(true));
        });
    }

    if (createChannelForm) {
        createChannelForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const channelName = document.getElementById("channel-name").value;

            try {
                const response = await fetch("http://localhost:3000/create-channel", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ channelName: channelName })
                });

                const data = await response.json();
                alert(data.message);
                fetchChannels();
                fetchUsers();
            } catch (error) {
                console.error("Error creating channel:", error);
            }
        });
    }

    if (removeChannelButton) {
        removeChannelButton.addEventListener("click", async () => {
            const selectedChannel = channelsDropdown.value;
            if (!selectedChannel) return;

            try {
                const response = await fetch("http://localhost:3000/remove-channel", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ channelId : selectedChannel })
                });

                const data = await response.json();
                alert(data.message);
                fetchChannels();
                fetchUsers();
            } catch (error) {
                console.error("Error removing channel:", error);
            }
        });
    }

    if (assignUserForm) {
        assignUserForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const channelId = channelSelect.value;
            const userId = usersDropdown.value;

            try {
                const response = await fetch("http://localhost:3000/assign-user", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ channelId, userId })
                });

                const data = await response.json();
                alert(data.message);
            } catch (error) {
                console.error("Error assigning user:", error);
            }
        });
    }

    if (deassignUserForm) {
        deassignUserForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const channelId = channelDeassign.value;
            const userId = userDeassign.value;

        
            try {
                const response = await fetch("http://localhost:3000/deassign-user", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ channelId, userId })
                });

                const data = await response.json();
                alert(data.message);
            } catch (error) {
                console.error("Error de-assigning user:", error);
            }
        });
    }

    if (promoteUserForm) {
        promoteUserForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const userId = document.getElementById("promote-user").value;

            try {
                const role = "admin";
                console.log("Sending promote request...");
                const response = await fetch("http://localhost:3000/change-role", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ role, userId })
                });

                const data = await response.json();
                alert(data.message);
            } catch (error) {
                console.error("Error promoting user:", error);
            }
        });
    }

    if (demoteUserForm) {
        demoteUserForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const userId = document.getElementById("demote-user").value;
            const role = "member";
            try {
                const response = await fetch("http://localhost:3000/change-role", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ role, userId })
                });

                const data = await response.json();
                alert(data.message);
            } catch (error) {
                console.error("Error demoting user:", error);
            }
        });
    }

    fetchChannels();
    fetchUsers();
});
