function bookAppointment() {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const doctor = document.getElementById('doctor').value;

    alert(`Appointment booked with ${doctor} on ${date} at ${time}.`);
}
