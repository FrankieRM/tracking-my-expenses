package org.todevs.tme.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

import org.todevs.tme.domain.enumeration.TimeUnity;

import org.todevs.tme.domain.enumeration.ScheduleStatus;

/**
 * A Schedule.
 */
@Entity
@Table(name = "schedule")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Schedule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "time_unity")
    private TimeUnity timeUnity;

    @Column(name = "frecuency_number")
    private Integer frecuencyNumber;

    @Column(name = "day_of_week")
    private String dayOfWeek;

    @Column(name = "same_day")
    private Boolean sameDay;

    @Column(name = "frecuency_ordinal_number")
    private String frecuencyOrdinalNumber;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @NotNull
    @Column(name = "limit_date", nullable = false)
    private LocalDate limitDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "schedule_status")
    private ScheduleStatus scheduleStatus;

    @OneToOne(optional = false)    @NotNull

    @JoinColumn(unique = true)
    private Transaction transaction;

    @OneToOne(optional = false)    @NotNull

    @JoinColumn(unique = true)
    private Notification notification;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TimeUnity getTimeUnity() {
        return timeUnity;
    }

    public Schedule timeUnity(TimeUnity timeUnity) {
        this.timeUnity = timeUnity;
        return this;
    }

    public void setTimeUnity(TimeUnity timeUnity) {
        this.timeUnity = timeUnity;
    }

    public Integer getFrecuencyNumber() {
        return frecuencyNumber;
    }

    public Schedule frecuencyNumber(Integer frecuencyNumber) {
        this.frecuencyNumber = frecuencyNumber;
        return this;
    }

    public void setFrecuencyNumber(Integer frecuencyNumber) {
        this.frecuencyNumber = frecuencyNumber;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public Schedule dayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
        return this;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public Boolean isSameDay() {
        return sameDay;
    }

    public Schedule sameDay(Boolean sameDay) {
        this.sameDay = sameDay;
        return this;
    }

    public void setSameDay(Boolean sameDay) {
        this.sameDay = sameDay;
    }

    public String getFrecuencyOrdinalNumber() {
        return frecuencyOrdinalNumber;
    }

    public Schedule frecuencyOrdinalNumber(String frecuencyOrdinalNumber) {
        this.frecuencyOrdinalNumber = frecuencyOrdinalNumber;
        return this;
    }

    public void setFrecuencyOrdinalNumber(String frecuencyOrdinalNumber) {
        this.frecuencyOrdinalNumber = frecuencyOrdinalNumber;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public Schedule dueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
        return this;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDate getLimitDate() {
        return limitDate;
    }

    public Schedule limitDate(LocalDate limitDate) {
        this.limitDate = limitDate;
        return this;
    }

    public void setLimitDate(LocalDate limitDate) {
        this.limitDate = limitDate;
    }

    public ScheduleStatus getScheduleStatus() {
        return scheduleStatus;
    }

    public Schedule scheduleStatus(ScheduleStatus scheduleStatus) {
        this.scheduleStatus = scheduleStatus;
        return this;
    }

    public void setScheduleStatus(ScheduleStatus scheduleStatus) {
        this.scheduleStatus = scheduleStatus;
    }

    public Transaction getTransaction() {
        return transaction;
    }

    public Schedule transaction(Transaction transaction) {
        this.transaction = transaction;
        return this;
    }

    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
    }

    public Notification getNotification() {
        return notification;
    }

    public Schedule notification(Notification notification) {
        this.notification = notification;
        return this;
    }

    public void setNotification(Notification notification) {
        this.notification = notification;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Schedule)) {
            return false;
        }
        return id != null && id.equals(((Schedule) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Schedule{" +
            "id=" + getId() +
            ", timeUnity='" + getTimeUnity() + "'" +
            ", frecuencyNumber=" + getFrecuencyNumber() +
            ", dayOfWeek='" + getDayOfWeek() + "'" +
            ", sameDay='" + isSameDay() + "'" +
            ", frecuencyOrdinalNumber='" + getFrecuencyOrdinalNumber() + "'" +
            ", dueDate='" + getDueDate() + "'" +
            ", limitDate='" + getLimitDate() + "'" +
            ", scheduleStatus='" + getScheduleStatus() + "'" +
            "}";
    }
}
