package org.codecool.fitnesstracker.fitnesstracker.service;

import org.codecool.fitnesstracker.fitnesstracker.dao.model.FoodType;
import org.codecool.fitnesstracker.fitnesstracker.data.FoodTypeTotal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SpoonApiService {

    @Value("${spoonapi.url}")
    String spoonUrl;

    @Value("${spoonapi.key.name}")
    String apiKeyName;

    @Value("${spoonapi.key.value}")
    String apiKeyValue;

    private final RestTemplate restTemplate;
    public SpoonApiService(RestTemplateBuilder restTemplateBuilder)  {
        this.restTemplate = restTemplateBuilder.build();
    }

    public void getSearchedFoodTypeFromApi(String foodType) {
        System.out.println("belement");
//        String apiUrl = "https://api.spoonacular.com/food/ingredients/search?query="+foodType;
//
//        String response = restTemplate.getForObject(apiUrl, String.class, apiKey);
        try {
            URI uri;
            uri = new URI(spoonUrl+foodType);
            HttpHeaders headers = new HttpHeaders();
            headers.set(apiKeyName, apiKeyValue);
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
            HttpEntity<String> request = new HttpEntity<String>(headers);
            ResponseEntity<FoodTypeTotal> responseEntity = restTemplate.exchange(
                    uri, HttpMethod.GET, request, FoodTypeTotal.class);

            //System.out.println(responseEntity);

            if(responseEntity.getStatusCode() == HttpStatus.OK && responseEntity.getBody() != null) {
                FoodTypeTotal foodTypeTotal = responseEntity.getBody();
                System.out.println(foodTypeTotal.results());
            }

//            if (responseEntity.getStatusCode() == HttpStatus.OK && responseEntity.getBody() != null) {
//                FoodTypeTotal foodTypeTotal = responseEntity.getBody();
//                List<FoodType> foodTypes = foodTypeTotal.results().stream()
//                        .map(result -> new FoodType(result.id(), result.name(), result.image()))
//                        .collect(Collectors.toList());
//
//
//            }

        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }
}
