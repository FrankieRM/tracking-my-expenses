package org.todevs.tme.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;

import org.todevs.tme.domain.enumeration.TransactionType;

/**
 * A Transaction.
 */
@Entity
@Table(name = "transaction")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Transaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "amount", precision = 21, scale = 2, nullable = false)
    private BigDecimal amount;

    @NotNull
    @Column(name = "instant", nullable = false)
    private Instant instant;

    @Column(name = "description")
    private String description;

    @Column(name = "observations")
    private String observations;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_type", nullable = false)
    private TransactionType transactionType;

    @OneToOne(optional = false)    @NotNull

    @JoinColumn(unique = true)
    private Category category;

    @OneToOne(optional = false)    @NotNull

    @JoinColumn(unique = true)
    private Wallet sourceWallet;

    @OneToOne
    @JoinColumn(unique = true)
    private Wallet destinationWallet;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public Transaction amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Instant getInstant() {
        return instant;
    }

    public Transaction instant(Instant instant) {
        this.instant = instant;
        return this;
    }

    public void setInstant(Instant instant) {
        this.instant = instant;
    }

    public String getDescription() {
        return description;
    }

    public Transaction description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getObservations() {
        return observations;
    }

    public Transaction observations(String observations) {
        this.observations = observations;
        return this;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    public TransactionType getTransactionType() {
        return transactionType;
    }

    public Transaction transactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
        return this;
    }

    public void setTransactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
    }

    public Category getCategory() {
        return category;
    }

    public Transaction category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Wallet getSourceWallet() {
        return sourceWallet;
    }

    public Transaction sourceWallet(Wallet wallet) {
        this.sourceWallet = wallet;
        return this;
    }

    public void setSourceWallet(Wallet wallet) {
        this.sourceWallet = wallet;
    }

    public Wallet getDestinationWallet() {
        return destinationWallet;
    }

    public Transaction destinationWallet(Wallet wallet) {
        this.destinationWallet = wallet;
        return this;
    }

    public void setDestinationWallet(Wallet wallet) {
        this.destinationWallet = wallet;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Transaction)) {
            return false;
        }
        return id != null && id.equals(((Transaction) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Transaction{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", instant='" + getInstant() + "'" +
            ", description='" + getDescription() + "'" +
            ", observations='" + getObservations() + "'" +
            ", transactionType='" + getTransactionType() + "'" +
            "}";
    }
}
