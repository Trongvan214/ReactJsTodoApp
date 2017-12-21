import React from 'react';
import AllFormat from './allformat';
import WeekFormat from './weekformat';
import TodayFormat from './todayformat';
import DateLessFormat from './datelessformat';
import UpcomingFormat from './upcomingformat';
import StarFormat from './starformat';

const pickedFormat = ({todos,choose,shareFunction,dateless}) => {
    if(choose === "star"){
        return <StarFormat todo={todos}/>
    }
    else if(choose === "today"){
        return <TodayFormat todo={todos} utcFunction={shareFunction}/>
    }
    else if(choose === "dateless"){
        return <DateLessFormat sortedTodo={dateless} />
    }
    else if(choose === "week"){
        return <WeekFormat todo={todos} utcFunction={shareFunction}/>
    }
    else if(choose === "upcoming"){
        return <UpcomingFormat todo={todos} utcFunction={shareFunction}/>
    }
    else {
        return <AllFormat todo={todos} />
    }
}
export default pickedFormat;