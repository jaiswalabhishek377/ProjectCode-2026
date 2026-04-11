const InputAgeDob = document.getElementById("agedob");
const TaskDeadline = document.getElementById("deadline");
const CalculateAgebtn= document.getElementById("calculateAge");
const CalculateDeadlinebtn= document.getElementById("calculateDeadline");
const ageResult= document.getElementById("ageResult");
const deadlineResult= document.getElementById("deadlineResult");


CalculateAgebtn.addEventListener("click", function(){
    const Dob = new Date(InputAgeDob.value);
    const today = new Date();
    let years = today.getFullYear() - Dob.getFullYear();
    let months = today.getMonth() - Dob.getMonth();
    let days = today.getDate() - Dob.getDate();
    // 1. Adjust for negative days (Borrow from previous month)
    if (days < 0) {
        months--;
        // Get the last day of the previous month
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }
    // 2. Adjust for negative months (Borrow from year)
    if (months < 0) {
        years--;
        months += 12;
    }
    ageResult.innerHTML = `You are ${years} years, ${months} months, and ${days} days old.`;
});

CalculateDeadlinebtn.addEventListener("click", function(){
    const Deadline = new Date(TaskDeadline.value);
    const today = new Date();
    const timeDiff = Deadline - today;

    if(timeDiff < 0){
        deadlineResult.innerHTML = "The deadline has already passed.";
    } else {
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hoursDiff = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesDiff = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const secondsDiff = Math.floor((timeDiff % (1000 * 60)) / 1000);

        deadlineResult.innerHTML = `Time remaining: ${daysDiff} days, ${hoursDiff} hours, ${minutesDiff} minutes, and ${secondsDiff} seconds.`;
    }
});

