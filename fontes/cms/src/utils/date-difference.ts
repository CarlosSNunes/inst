import * as moment from 'moment';
import { DateDifference } from 'src/models/date-difference/date-difference.model';

/**
 * 
 * @param date1 Date that the difference will be calculated, the most recent date.
 * @param date2 Date that will be differencied.
 * @returns {DateDifference} DateDifference object
 */
export default function getDifferences(date1: Date, date2: Date): DateDifference {

    const diffObj: Partial<DateDifference> = new DateDifference({
        seconds: moment(date1).diff(date2, 'seconds'),
        minutes: moment(date1).diff(date2, 'minutes'),
        hours: moment(date1).diff(date2, 'hours'),
        days: moment(date1).diff(date2, 'days'),
        months: moment(date1).diff(date2, 'months'),
        years: moment(date1).diff(date2, 'years'),
    });

    let diffResponseMessage: string = '1 segundo atrás';

    if (diffObj.seconds >= 1 && diffObj.seconds < 60) {
        if (diffObj.seconds == 1) {
            diffResponseMessage = `${diffObj.seconds} segundo atrás`;
        }
        if (diffObj.seconds > 1) {
            diffResponseMessage = `${diffObj.seconds} segundos atrás`;
        }
    }

    if (diffObj.minutes >= 1 && diffObj.minutes < 60) {
        if (diffObj.minutes == 1) {
            diffResponseMessage = `${diffObj.minutes} minuto atrás`;
        }
        if (diffObj.minutes > 1) {
            diffResponseMessage = `${diffObj.minutes} minutos atrás`;
        }
    }

    if (diffObj.hours >= 1 && diffObj.hours < 48) {
        if (diffObj.hours == 1) {
            diffResponseMessage = `${diffObj.hours} hora atrás`;
        }
        if (diffObj.hours > 1) {
            diffResponseMessage = `${diffObj.hours} horas atrás`;
        }
    }

    if (diffObj.days > 1) {
        if (diffObj.days == 1) {
            diffResponseMessage = `${diffObj.days} dia atrás`;
        }
        if (diffObj.days > 1) {
            diffResponseMessage = `${diffObj.days} dias atrás`;
        }
    }

    if (diffObj.months >= 1 && diffObj.months < 12) {
        if (diffObj.months == 1) {
            diffResponseMessage = `${diffObj.months} mês atrás`;
        }
        if (diffObj.months > 1) {
            diffResponseMessage = `${diffObj.months} meses atrás`;
        }
    }

    if (diffObj.years >= 1) {
        if (diffObj.years == 1) {
            diffResponseMessage = `${diffObj.years} ano atrás`;
        }
        if (diffObj.years > 1) {
            diffResponseMessage = `${diffObj.years} anos atrás`;
        }
    }

    return new DateDifference({
        ...diffObj,
        diffResponseMessage
    })
}