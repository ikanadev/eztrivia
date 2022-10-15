package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"sync"
)

const (
	baseUrl = "https://www.dota2.com/datafeed"
)

type HeroDataResp struct {
	Result struct {
		Data struct {
			Heroes []interface{} `json:"heroes"`
		} `json:"data"`
	} `json:"result"`
}
type HeroListResp struct {
	Result struct {
		Data struct {
			Heroes []struct {
				ID   int    `json:"id"`
				Name string `json:"name"`
			} `json:"heroes"`
		} `json:"data"`
	} `json:"result"`
}

func getHeroData(id, index int, heroes []interface{}, wg *sync.WaitGroup) {
	url := fmt.Sprintf("%s/herodata?language=english&hero_id=%d", baseUrl, id)
	resp, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()
	var data HeroDataResp
	err = json.NewDecoder(resp.Body).Decode(&data)
	if err != nil {
		log.Fatal(err)
	}
	// Response always return a single hero
	heroes[index] = data.Result.Data.Heroes[0]
	wg.Done()
}

func saveHeroSkillsImages(heroes []interface{}) {
	abilities := []string{}
	for _, heroData := range heroes {
		hero, ok := heroData.(map[string]interface{})
		if !ok {
			log.Println("Skipping, invalid Hero")
			break
		}
		heroAbs, ok := hero["abilities"].([]interface{})
		if !ok {
			log.Println("Skipping, invalid Hero Abs")
			break
		}
		for _, ab := range heroAbs {
			abVal, ok := ab.(map[string]interface{})
			if !ok {
				log.Println("Skipping, invalid Hero Abs")
				break
			}
			abilities = append(abilities, abVal["name"].(string))
		}
	}
	if len(abilities) == 0 {
		return
	}

	// https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/antimage_mana_overload.png
	baseUrl := "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/"
	var wg sync.WaitGroup
	for _, ability := range abilities {
		wg.Add(1)
		url := fmt.Sprintf("%s%s.png", baseUrl, ability)
		go getAndSaveImage("public/img/skills", ability+".png", url, &wg)
	}
	wg.Wait()
	log.Println("Hero abilities saved")
}

func saveHeroesData(list HeroListResp) {
	var wg sync.WaitGroup
	heroes := make([]interface{}, len(list.Result.Data.Heroes))
	for index, hero := range list.Result.Data.Heroes {
		wg.Add(1)
		go getHeroData(hero.ID, index, heroes, &wg)
	}
	wg.Wait()
	saveHeroSkillsImages(heroes)
	jsonData, err := json.Marshal(heroes)
	if err != nil {
		log.Fatal(err)
	}
	file, err := os.Create("public/herodata/data.json")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()
	_, err = file.Write(jsonData)
	if err != nil {
		log.Fatal(err)
	}
}

func getHeroList() HeroListResp {
	url := fmt.Sprintf("%s/herolist?language=english", baseUrl)
	resp, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	var data HeroListResp
	err = json.NewDecoder(resp.Body).Decode(&data)
	if err != nil {
		log.Fatal(err)
	}
	return data
}

func getAndSaveImage(directoryPath, fileName, url string, wg *sync.WaitGroup) {
	respImg, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	defer respImg.Body.Close()
	filePath := fmt.Sprintf("%s/%s", directoryPath, fileName)
	file, err := os.Create(filePath)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()
	_, err = io.Copy(file, respImg.Body)
	if err != nil {
		log.Fatal(err)
	}
	wg.Done()
}

func saveHeroImages(list HeroListResp) {
	baseUrl := "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/"
	var wg sync.WaitGroup
	for _, hero := range list.Result.Data.Heroes {
		wg.Add(1)
		heroName := hero.Name[14:]
		url := fmt.Sprintf("%s%s.png", baseUrl, heroName)
		go getAndSaveImage("public/img/heroes", heroName+".png", url, &wg)
	}
	wg.Wait()
}

func main() {
	heroList := getHeroList()
	saveHeroImages(heroList)
	log.Println("Hero images saved")
	saveHeroesData(heroList)
	log.Println("Hero data saved")
	/*
		heroData := getHeroData(1)
		file, err := os.Create("public/herodata.json")
		if err != nil {
			log.Fatal(err)
		}
		defer file.Close()
		stringData, err := json.Marshal(heroData)
		if err != nil {
			log.Fatal(err)
		}
		file.Write(stringData)
	*/
}
