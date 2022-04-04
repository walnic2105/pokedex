
import React, { useState, useEffect } from "react";
import axios from 'axios';

export default () => {
    const [pokemonName, setPokemonName] = useState('');
    const [pokemon, setPokemon] = useState({
        data: {
            name: "",
            sprites: {
                front_default: ""
            },
            types: [{
                type: {
                    name: ""
                }
            }],
            stats: [{
                base_stat: "",
                stat: {
                    name: ""
                }
            }, {
                base_stat: "",
                stat: {
                    name: ""
                }
            }, {
                base_stat: "",
                stat: {
                    name: ""
                }
            }]
        }
    });

    const generateRandomIntegerInRange = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const fetchPokemons = async () => {
        const pokemonId = generateRandomIntegerInRange(1, 898);
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(function (response) {
                setPokemon(response);
            }).catch(function (error) {
                // handle error
                console.log(error);
            });;

    };

    const onSubmit = async (event: any) => {
        event.preventDefault();
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(function (response) {
                setPokemon(response);
            }).catch(function (error) {
                // handle error
                console.log(error);
            });
        setPokemonName('');
    };

    useEffect(() => {
        fetchPokemons();
    }, []);

    return (
        <div className="container h-100">
            <div className="row align-items-center mt-5">
                <div className="col-4 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label>Pokemon</label>
                                    <input
                                        value={pokemonName}
                                        onChange={e => setPokemonName(e.target.value)}
                                        className="form-control"></input>
                                </div>
                                <button className="btn btn-primary btn-sm float-end mt-1">I choose you!!</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row align-items-center mt-5">
                <div className="col-4 mx-auto">
                    <div className="card">
                        <div className="user text-center bg-danger">
                            <div className="profile"> <img src={pokemon.data.sprites.front_default} className="rounded-circle" /> </div>
                        </div>
                        <div className="mt-5 text-center">
                            <h4 className="mb-0">{pokemon.data.name}</h4> <span className="text-muted d-block mb-2">{pokemon.data.types[0].type.name}</span>
                            <div className="d-flex justify-content-between align-items-center mt-4 px-4">
                                <div className="stats">
                                    <h6 className="mb-0">{pokemon.data.stats[0].stat.name}</h6> <span>{pokemon.data.stats[0].base_stat}</span>
                                </div>
                                <div className="stats">
                                    <h6 className="mb-0">{pokemon.data.stats[1].stat.name}</h6> <span>{pokemon.data.stats[1].base_stat}</span>
                                </div>
                                <div className="stats">
                                    <h6 className="mb-0">{pokemon.data.stats[2].stat.name}</h6> <span>{pokemon.data.stats[2].base_stat}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};