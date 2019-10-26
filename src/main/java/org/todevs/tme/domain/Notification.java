package org.todevs.tme.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Notification.
 */
@Entity
@Table(name = "notification")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Notification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "same_day")
    private Boolean sameDay;

    @Column(name = "before_days")
    private Integer beforeDays;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isSameDay() {
        return sameDay;
    }

    public Notification sameDay(Boolean sameDay) {
        this.sameDay = sameDay;
        return this;
    }

    public void setSameDay(Boolean sameDay) {
        this.sameDay = sameDay;
    }

    public Integer getBeforeDays() {
        return beforeDays;
    }

    public Notification beforeDays(Integer beforeDays) {
        this.beforeDays = beforeDays;
        return this;
    }

    public void setBeforeDays(Integer beforeDays) {
        this.beforeDays = beforeDays;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Notification)) {
            return false;
        }
        return id != null && id.equals(((Notification) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Notification{" +
            "id=" + getId() +
            ", sameDay='" + isSameDay() + "'" +
            ", beforeDays=" + getBeforeDays() +
            "}";
    }
}
