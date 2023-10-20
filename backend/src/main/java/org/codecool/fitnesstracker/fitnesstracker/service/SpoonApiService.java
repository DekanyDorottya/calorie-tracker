package org.codecool.fitnesstracker.fitnesstracker.service;

import org.codecool.fitnesstracker.fitnesstracker.data.FoodTypeInfo;
import org.codecool.fitnesstracker.fitnesstracker.data.FoodTypeTotalHitsByName;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.util.*;

@Service
public class SpoonApiService {

    private static final String URL_AUTOCOMPLETE_QUERY = "autocomplete?query=";
    private static final String AUTOCOMPLETE_PARAMETERS = "&number=5&metaInformation=true";
    private static final String URL_INGREDIENT_INFORMATION = "/information?amount=100&unit=grams";

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

    public Optional<List<FoodTypeInfo>> getSearchedFoodTypeFromApi(String foodType) {
        Optional <List<FoodTypeTotalHitsByName>> searchedIngredientsById = getListOfFoodTypeIds(foodType);

        Optional <List<FoodTypeInfo>> foodTypeInfos;
        List<FoodTypeInfo> foodTypeInfoList = new ArrayList<>();
        if (searchedIngredientsById.isPresent()) {
            for (FoodTypeTotalHitsByName foodTypeTotalHitsByName : searchedIngredientsById.get()) {
                foodTypeInfoList.add(getListOfIngredientInfo(foodTypeTotalHitsByName.id()));
            }
            foodTypeInfos = Optional.of(foodTypeInfoList);

        } else {
            return Optional.empty();
        }
        return foodTypeInfos;

    }

    private Optional<List<FoodTypeTotalHitsByName>> getListOfFoodTypeIds(String foodType) {

        try {
            String encodedQueryParamValue = URLEncoder.encode(foodType, "UTF-8");
            URI uri;
            uri = new URI(spoonUrl+URL_AUTOCOMPLETE_QUERY+encodedQueryParamValue+AUTOCOMPLETE_PARAMETERS);
            HttpHeaders headers = new HttpHeaders();
            headers.set(apiKeyName, apiKeyValue);
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
            HttpEntity<String> request = new HttpEntity<>(headers);
            ResponseEntity<List<FoodTypeTotalHitsByName>> responseEntity = restTemplate.exchange(
                    uri, HttpMethod.GET, request, new ParameterizedTypeReference<>() {
                    });

            if(responseEntity.getStatusCode() == HttpStatus.OK && responseEntity.getBody() != null && responseEntity.getBody().size() > 0) {
                List<FoodTypeTotalHitsByName> foodTypeTotalHitsByName = responseEntity.getBody();
                return Optional.of(foodTypeTotalHitsByName);
            } else {
                return Optional.empty();
            }
            } catch (URISyntaxException | UnsupportedEncodingException e) {
            e.printStackTrace();
            return Optional.empty();
            }

    }

    private FoodTypeInfo getListOfIngredientInfo(long id) {
        FoodTypeInfo foodTypeInfo = null;
        try {
            URI uri;
            uri = new URI (spoonUrl+id+URL_INGREDIENT_INFORMATION);
            HttpHeaders headers = new HttpHeaders();
            headers.set(apiKeyName, apiKeyValue);
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
            HttpEntity<String> request = new HttpEntity<>(headers);
            ResponseEntity<FoodTypeInfo> responseEntity = restTemplate.exchange(
                    uri, HttpMethod.GET, request, FoodTypeInfo.class
            );
            foodTypeInfo = responseEntity.getBody();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        return foodTypeInfo;
    }
}
