package com.org.proto.kart.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "kart")
public class Kart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @OneToMany(
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "kart")
    private Set<Item> item;

}
