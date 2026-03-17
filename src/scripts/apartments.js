class ApartmentAPI {
    async predict(data) {
        try {
            const response = await fetch("http://127.0.0.1:8000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error();

            return await response.json();

        } catch (e) {
            console.error(e);
            return { predicted_price: null };
        }
    }
}

const api = new ApartmentAPI();

document.getElementById("predict-btn")?.addEventListener("click", predict);

async function predict() {
    const resultContainer = document.getElementById("result-container");

    const data = {
        housing_type: val("housing_type"),
        district: val("district"),
        rooms: num("rooms"),
        is_studio: val("is_studio"),
        total_area: num("total_area"),
        living_area: num("living_area"),
        kitchen_area: num("kitchen_area"),
        floor: num("floor"),
        num_floors: num("num_floors"),
        bathrooms_type: val("bathrooms_type"),
        num_loggia: num("num_loggia"),
        num_balcony: num("num_balcony"),
        kitchen_and_living: val("kitchen_and_living"),
        condition: val("condition"),
        ceiling_height: num("ceiling_height"),
        nearest_metro_st: val("nearest_metro_st"),
        minutes_to_metro: num("minutes_to_metro"),
        num_freight_lift: num("num_freight_lift"),
        num_passenger_lift: num("num_passenger_lift"),
        parking_type: val("parking_type"),
        building_type: val("building_type"),
        furniture: val("furniture"),
        deal_type: val("deal_type"),
        house_completion_year: num("house_completion_year"),
        first_floor_is_com: val("first_floor_is_com"),
        playground: val("playground")
    };

    resultContainer.innerHTML = '<div class="loading">Считаем...</div>';

    const res = await api.predict(data);

    if (!res.predicted_price) {
        resultContainer.innerHTML = '<div class="error">Ошибка</div>';
        return;
    }

    render(res.predicted_price);
}

function val(id) {
    return document.getElementById(id).value;
}

function num(id) {
    return Number(document.getElementById(id).value) || 0;
}

function render(price) {
    const resultContainer = document.getElementById("result-container");

    resultContainer.innerHTML = `
        <div class="playlist-container">
            <div class="track-row">
                <div class="track-name">💰 Цена</div>
                <div class="track-artist">${Math.round(price).toLocaleString()} ₽</div>
            </div>
        </div>
    `;
}