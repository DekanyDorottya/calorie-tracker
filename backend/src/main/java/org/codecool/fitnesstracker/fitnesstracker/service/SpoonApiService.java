package org.codecool.fitnesstracker.fitnesstracker.service;

import org.codecool.fitnesstracker.fitnesstracker.dao.model.FoodType;
import org.codecool.fitnesstracker.fitnesstracker.data.FoodTypeInfo;
import org.codecool.fitnesstracker.fitnesstracker.data.FoodTypeResult;
import org.codecool.fitnesstracker.fitnesstracker.data.FoodTypeTotal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SpoonApiService {

    private static final String URL_INGREDIENT_SEARCH = "search?query=";
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
        Optional <List<FoodTypeResult>> searchedIngredientsById = getListOfFoodTypeIds(foodType);

        Optional <List<FoodTypeInfo>> foodTypeInfos;
        List<FoodTypeInfo> foodTypeInfoList = new ArrayList<>();
        if (searchedIngredientsById.isPresent()) {
            for (FoodTypeResult foodTypeResult : searchedIngredientsById.get()) {
                foodTypeInfoList.add(getListOfIngredientInfo(foodTypeResult.id()));
            }
            foodTypeInfos = Optional.of(foodTypeInfoList);

        } else {
            return Optional.empty();
        }
        return foodTypeInfos;

    }

    private Optional<List<FoodTypeResult>> getListOfFoodTypeIds(String foodType) {

        try {
            String encodedQueryParamValue = URLEncoder.encode(foodType, "UTF-8");
            URI uri;
            uri = new URI(spoonUrl+URL_INGREDIENT_SEARCH+encodedQueryParamValue);
            HttpHeaders headers = new HttpHeaders();
            headers.set(apiKeyName, apiKeyValue);
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
            HttpEntity<String> request = new HttpEntity<>(headers);
            ResponseEntity<FoodTypeTotal> responseEntity = restTemplate.exchange(
                    uri, HttpMethod.GET, request, FoodTypeTotal.class);

            if(responseEntity.getStatusCode() == HttpStatus.OK && responseEntity.getBody() != null && responseEntity.getBody().totalResults() > 0) {
                FoodTypeTotal foodTypeTotal = responseEntity.getBody();
                List<FoodTypeResult> foodTypeResults = foodTypeTotal.results();
                return Optional.of(foodTypeResults);
            } else {
                return Optional.empty();
            }
            } catch (URISyntaxException | UnsupportedEncodingException e) {
            e.printStackTrace();
            return Optional.empty();
            }

    }

    private FoodTypeInfo getListOfIngredientInfo(int id) {
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
