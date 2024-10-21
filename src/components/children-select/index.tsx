import Card from "../card";
import data from "../../data/children.json";
import InputBox from "../inputBox";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/appProvider";
import TextareaBox from "../textareaBox";

export default function ChildrenSelect() {
    const { childrenData, setChildrenData } = useAppContext();
    const [placeholders, setPlaceholders] = useState({
        room: "",
        objects: "",
        uniqueValue: "",
        powers: [],
        weaknesses: [],
        special: [],
        bonds: ""
    });

    const handleInputChange = (name: string, value: string) => {
        setChildrenData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCardSelect = (selectedClass: string, label: string, room: string, objects: string, values: string, powers: any, weaknesses: any, special: any, bonds: any) => {
        setChildrenData((prev: { unique: any; powers: any; weaknesses: any; special: any; bonds: any }) => ({
            ...prev,
            class: selectedClass,
            unique: { ...prev.unique, label },
            powers,
            weaknesses,
            special,
            bonds
        }));

        setPlaceholders({
            room,
            objects,
            uniqueValue: values,
            powers,
            weaknesses,
            special,
            bonds
        });
    };

    const handleEditableChange = (index: number, section: string, value: string) => {
        setChildrenData((prev: any) => {
            const updatedSection = [...prev[section]];
            updatedSection[index].description = value;
            return {
                ...prev,
                [section]: updatedSection
            };
        });
    };

    return (
        <>
            <div className="flex flex-col bg-orange-400 p-2 m-5 rounded-lg">
                <span className="text-white text-2xl font-bold">Pivetes</span>
                <span className="text-white font-bold">Selecione somente um arquetipo de pivete.</span>
                <div className="flex overflow-x-auto space-x-4 p-2">
                    {data.map((obj) => (
                        <Card
                            key={obj.class}
                            img={obj.img}
                            overlayText={obj.class}
                            altText={obj.altText}
                            onClick={() => handleCardSelect(obj.class, obj.unique.label, obj.room, obj.objects, obj.unique.values, obj.powers, obj.weaknesses, obj.special, obj.bonds)}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col bg-orange-400 p-2 m-5 rounded-lg">
                <span className="text-white text-2xl font-bold">Dados do Pivete</span>
                <div className="grid grid-cols-2 gap-3">
                    <InputBox
                        label="Nome:"
                        linkedFor="children-name"
                        height="h-8"
                        blockSize
                        onChange={(value: string) => handleInputChange("name", value)}
                    />
                    <InputBox
                        label="Classe do Pivete:"
                        height="h-8"
                        linkedFor="children-class"
                        blockSize
                        value={childrenData.class}
                        disable={true}
                        onChange={(value: string) => handleInputChange("class", value)}
                    />
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <TextareaBox
                        label="Seu quarto é:"
                        linkedFor="children-room"
                        height="h-20"
                        placeholder={placeholders.room}
                        onChange={(value: string) => handleInputChange("room", value)}
                    />
                    <TextareaBox
                        label="Objetos icônicos:"
                        linkedFor="children-object"
                        height="h-20"
                        placeholder={placeholders.objects}
                        onChange={(value: string) => handleInputChange("objects", value)} />
                    <TextareaBox
                        label={`${childrenData.unique.label}:`}
                        linkedFor="children-unique"
                        placeholder={placeholders.uniqueValue}
                        height={
                            childrenData?.unique?.values?.length && childrenData.unique.values.length > 140
                                ? "h-24"
                                : "h-20"
                        }
                        onChange={(value: any) =>
                            setChildrenData((prev: { unique: any }) => ({
                                ...prev,
                                unique: { ...prev.unique, values: value },
                            }))
                        }
                    />
                </div>

                <div className="flex flex-col mt-2">
                    <h2 className="font-bold text-white rounded-t-md">
                        Poderes:
                    </h2>
                    <div className="bg-orange-300 h-72 grid grid-cols-3 gap-4 rounded-md">
                        {childrenData.powers.map((power: any, index: number) => (
                            <div key={index} className="rounded-lg">
                                <TextareaBox
                                    label={power.name}
                                    linkedFor="children-powers"
                                    height="h-60"
                                    placeholder={power.description}
                                    onChange={(e) => handleEditableChange(index, "powers", e.target.value)}
                                    disable
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className=" mt-2">
                    <h2 className=" font-bold text-white">
                        Fraquezas:
                    </h2>
                    <div className="bg-orange-300 h-48 grid grid-cols-2 gap-4 rounded-md">
                        {childrenData.weaknesses.map((weakness: any, index: number) => (
                            <div key={index} className="rounded-lg">
                                <TextareaBox
                                    label={weakness.name}
                                    linkedFor="children-weakness"
                                    height="h-36"
                                    placeholder={weakness.description}
                                    onChange={(e) => handleEditableChange(index, "weaknesses", e.target.value)}
                                    disable
                                />

                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-4" >
                    <div >
                        <h2 className="font-bold text-white">
                            Especial:
                        </h2>
                        <div className="bg-orange-300 h-92 rounded-md">
                            {childrenData.special.map((special: any, index: number) => (
                                <div key={index} className="rounded-lg">
                                    <TextareaBox
                                        label={special.name}
                                        linkedFor="children-special"
                                        height="h-36"
                                        placeholder={special.description}
                                        onChange={(e) => handleEditableChange(index, "special", e.target.value)}
                                        disable
                                    />
                                </div>

                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="font-bold text-white">
                            Vínculos:
                        </h2>
                        <TextareaBox
                            linkedFor="children-bonds"
                            height="h-[11.75rem]"
                            blockSize
                            placeholder={childrenData.bonds}
                            onChange={(value: string) => handleInputChange("bonds", value)} label={""}                        />
                    </div>
                </div>
            </div>


        </>
    );
}