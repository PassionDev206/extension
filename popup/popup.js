document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fetchButton').addEventListener('click', () => {
        fetch('http://192.168.14.41:8080/api/data')
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text(); // or response.json() for JSON response
            })
            .then(function(data) {
                data = JSON.parse(data);
                let crash = data.crash
                let dotPostion = crash.indexOf(".")
                crash = crash.slice(0, dotPostion + 3)
                document.getElementById("crash_value").innerHTML = "Crash value: <b>" + crash + "</b>"
            })
            .catch(function(error) {
                console.error('Fetch error:', error);
            });

    });
});
