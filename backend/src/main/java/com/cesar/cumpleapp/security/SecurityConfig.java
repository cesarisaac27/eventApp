package com.cesar.cumpleapp.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth

                // Swagger
                .requestMatchers(
                        "/swagger-ui/**",
                        "/v3/api-docs/**"
                ).permitAll()

                // Login y registro
                .requestMatchers(
                        "/api/auth/**"
                ).permitAll()

                // Consulta pública de eventos
                .requestMatchers(
                        "/api/events/**"
                ).permitAll()

                // Mensajes públicos
                .requestMatchers(
                        "/api/public/events/**"
                ).permitAll()

                // Uploads públicos (por ahora)
                .requestMatchers(
                        "/api/upload/**"
                ).permitAll()

                // Administración
                .requestMatchers(
                        "/api/admin/**"
                ).authenticated()

                // Perfil usuario
                .requestMatchers(
                        "/users/me"
                ).authenticated()

                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}