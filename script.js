
var inputElements = document.querySelectorAll('.my-input')

inputElements.forEach(function(inputElement){
    inputElement.addEventListener('focus', () => {
        inputElement.style.border = '2px solid var(--purple)'
    })

    inputElement.addEventListener('blur', () => {
        inputElement.style.border = '1px solid var(--light-grey)'
    })
})

function calculateAge(){

        const dayInput = document.getElementById('date-input')
        const monthInput = document.getElementById('month-input');
        const yearInput = document.getElementById('year-input');
        
        if (!dayInput.value.trim() && !monthInput.value.trim() && !yearInput.value.trim()) {
            showError('This field is required', 'date-input', 'day-input-error', 'day-label');
            showError('This field is required', 'month-input', 'month-input-error', 'month-label');
            showError('This field is required', 'year-input', 'year-input-error', 'year-label');

            document.getElementById('years').textContent = '--';
            document.getElementById('months').textContent = '--';
            document.getElementById('days').textContent = '--';
            return;
        }

        //validation for empty day
        if(!dayInput.value.trim()){
            showError('This field is required', 'date-input', 'day-input-error', 'day-label')
            return;
        }

        //validation for invalid date(i.e day < 1 or > 31)
        const dayValue = parseInt(dayInput.value);
        if (isNaN(dayValue) || dayValue < 1 || dayValue > 31){
            showError('Must be a valid date', 'date-input', 'day-input-error', 'day-label');
            return;
        }

        //check for wrong date for specific months
        const monthValue = parseInt(monthInput.value)

        if((dayValue < 1 || dayValue > 30) && (monthValue === 4 || monthValue === 6 || monthValue === 9 || monthValue === 11)){
            showError('Must be a valid date', 'date-input', 'day-input-error', 'day-label');
            return;
        }

        // Validate February
    if (monthValue === 2) {
        const yearInput = document.getElementById('year-input');
        const yearValue = parseInt(yearInput.value);

        // Check for leap year
        const isLeapYear = (yearValue % 4 === 0 && yearValue % 100 !== 0) || (yearValue % 400 === 0);

        if (isLeapYear && (dayValue < 1 || dayValue > 29)) {
            showError('Must be a valid date', 'date-input', 'day-input-error', 'day-label');
            return;
        }

        if (!isLeapYear && (dayValue < 1 || dayValue > 28)) {
            showError('Must be a valid date', 'date-input', 'day-input-error', 'day-label');
            return;
        }
    }

        //Validate month
        if(!monthInput.value.trim()){
            showError('This field is required', 'month-input', 'month-input-error', 'month-label');
            return;
        }

        if(isNaN(monthValue) || monthValue < 1 || monthValue > 12){
            showError('Must be a valid month', 'month-input', 'month-input-error', 'month-label');
            return;
        }

        const yearValue = parseInt(yearInput.value);
        const date = new Date();
         const year = date.getFullYear()

         if (isNaN(yearValue) || yearValue ==''){
            showError('Must be a valid year', 'year-input', 'year-input-error', 'year-label');
            return;
         }

         if(yearValue > year){
            showError('Must be in the past', 'year-input', 'year-input-error', 'year-label');
            return;
         }

         if(yearValue < 1900){
            showError('Must be a more recent year', 'year-input', 'year-input-error', 'year-label');
            return;
         }

        
        //Clear any existing errors if the input is valid
        clearError('date-input', 'day-input-error', 'day-label');
        clearError('month-input', 'month-input-error', 'month-label');
        clearError('year-input', 'year-input-error', 'year-label')

        //ShowError function
       function showError(errorMessage, inputId, errorId, labelId){
            const errorDiv = document.getElementById(errorId);
            errorDiv.textContent = errorMessage;
            errorDiv.classList.add('error');

            const inputElement = document.getElementById(inputId)
            inputElement.style.border = '2px solid var(--light-red)';
            
            const labelElement = document.getElementById(labelId)
            labelElement.style.color = 'var(--light-red)';
       }

       //clearError function
       function clearError(inputId, errorId, labelId){
            const errorDiv = document.getElementById(errorId);
            errorDiv.textContent = '';
            errorDiv.classList.remove('error');
        
            const inputElement = document.getElementById(inputId);
            inputElement.style.border = '1px solid var(--light-grey)'
            const labelElement = document.getElementById(labelId);
            labelElement.style.color = 'var(--dark-grey)';
         } 


        // Get current date
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed, so add 1
        const currentDay = currentDate.getDate();

        // Extract user input
        const userYear = parseInt(yearInput.value);
        const userMonth = parseInt(monthInput.value);
        const userDay = parseInt(dayInput.value);

        // Calculate age in years
        let ageInYears = currentYear - userYear;

        // Calculate age in months and days
        let ageInMonths = currentMonth - userMonth;
        let ageInDays = currentDay - userDay;

        // Adjust for upcoming birthday
        if (ageInMonths < 0 || (ageInMonths === 0 && ageInDays < 0)) {
            ageInYears--;

            // Calculate remaining months and days until the upcoming birthday
        const nextBirthday = new Date(currentYear, userMonth - 1, userDay);
        const daysUntilNextBirthday = Math.ceil((nextBirthday - currentDate) / (1000 * 60 * 60 * 24));

        ageInMonths = 12 + ageInMonths - (ageInDays < 0 ? 1 : 0); // Adjust for the upcoming birthday
        ageInDays = ageInDays < 0 ? daysUntilNextBirthday : -ageInDays;
        }

        document.getElementById('years').textContent = ageInYears;
        document.getElementById('months').textContent = ageInMonths;
        document.getElementById('days').textContent = ageInDays; 
}

