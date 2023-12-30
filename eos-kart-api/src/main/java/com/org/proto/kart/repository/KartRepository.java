package com.org.proto.kart.repository;

import com.org.proto.kart.model.Kart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KartRepository extends JpaRepository<Kart, Long> {
}
