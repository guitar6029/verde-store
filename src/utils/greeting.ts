export const getGreeting = () : string => {
    const date = new Date();
    const hours =  date.getHours();

    if (hours < 12) {
        return 'Good Morning';
    } else if (hours >= 12 && hours <= 17) {
        return 'Good Afternoon';
    } else {
        return 'Good Evening';
    }
}