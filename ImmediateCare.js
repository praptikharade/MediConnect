document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('zip');
    const ptext = document.getElementById('address');

    // Add event listener to dropdown
    dropdown.addEventListener('change', function() {
        // Get the selected option
        const p = dropdown.options[dropdown.selectedIndex].text;
        
        // Update the text content
        ptext.textContent = `${p}`;
    });
});
