package org.codecool.fitnesstracker.fitnesstracker.user;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Stream;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public enum Role {
    USER,
    ADMIN;

    // example for mapping authorities to roles.
    // Exercise: Make it adhere to Open/Close principle
    public Collection<? extends GrantedAuthority> getAuthorities() {
        var authorityNames = switch (this) {
            // FIXME: Don't use had-written string literals
            case USER -> Set.of("SET_CALORIES", "REMOVE_ACTIVITY");
            case ADMIN -> Set.of("BAN_USER");
        };
        return authorityNames.stream().map(SimpleGrantedAuthority::new).toList();
    }
}
