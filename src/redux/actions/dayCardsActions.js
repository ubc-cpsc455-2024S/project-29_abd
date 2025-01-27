export const postDayCards = (dayCards) => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://localhost:3000/dayCards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dayCards),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            dispatch({ type: 'POST_DAYCARDS_SUCCESS', payload: data });
        } catch (error) {
            console.error('Error in postDayCards action:', error);
            dispatch({ type: 'POST_DAYCARDS_ERROR', error });
        }
    };
};
