import React, { Component, useState } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import CalendarStrip from 'react-native-calendar-strip'
import moment from 'moment';


const CalendarStripComponent = (props) => {
    console.log('Package version is 1.0.6')
    const [selectedDate, setSelectedDate] = useState();
    moment.locale('ru')
    console.log(`props`, props)

    const datesBlacklistFunc = date => {
      if(props.workDays && props.workDays.length > 0) {
        return !props.workDays.map(day => getDayId(day.workDay)).includes(date.isoWeekday()); // disable Saturdays
      }
    }

    const getDayId = (day) => {
      if(day) {
        switch(day.toLowerCase()) {
          case 'понедельник': return 1;
          case 'вторник': return 2;
          case 'среда': return 3;
          case 'четверг': return 4;
          case 'пятница': return 5;
          case 'суббота': return 6;
          case 'воскресенье': return 7;
        }
      }
    }

    const onDateSelected = (date) => {
      setSelectedDate(date);
      if(props.onSelect) {
        props.onSelect(date.toDate())
      }
    }

    if (props === undefined) {
      return null;
    }


		return (
			<View style={styles.wrapper}>
        <CalendarStrip
          datesBlacklist={datesBlacklistFunc}
          selectedDate={selectedDate}
          startingDate={moment()}
          onDateSelected={onDateSelected}
          scrollable
          style={{height:150, paddingTop: 20, paddingBottom: 10, width: '100%'}}
          calendarColor={props.calendarColor ? props.calendarColor : '#3343CE'}
          calendarHeaderStyle={{color: props.textColor ? props.textColor : 'white'}}
          dateNumberStyle={{color: props.textColor ? props.textColor : 'white'}}
          dateNameStyle={{color: props.textColor ? props.textColor : 'white'}}
          highlightDateContainerStyle={{backgroundColor: props.highlightContainerColor ? props.highlightContainerColor : 'red', color: props.highlightTextColor ? props.highlightTextColor : 'white'}}
          leftSelector={[]}
          rightSelector={[]}
        />
			</View>
		)
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
    flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
})

export default CalendarStripComponent
