<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\RucheRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource(
    paginationMaximumItemsPerPage:10
),
    ApiFilter(SearchFilter::class,properties: ['libelle'=>'partial'])
]
#[ORM\Entity(repositoryClass: RucheRepository::class)]
class Ruche
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $libelle = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $adresse = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 20, scale: 16, nullable: true)]
    private ?string $longitude = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 20, scale: 16, nullable: true)]
    private ?string $latitude = null;



    #[ORM\OneToMany(targetEntity: Intervention::class, mappedBy: 'ruche')]
    private Collection $interventions;

    #[ORM\OneToMany(targetEntity: Recolte::class, mappedBy: 'ruche')]
    private Collection $recoltes;

    public function __construct()
    {
        $this->interventions = new ArrayCollection();
        $this->recoltes = new ArrayCollection();

    }

        public function getId(): ?int
    {
        return $this->id;
    }

    public function getLibelle(): ?string
    {
        return $this->libelle;
    }

    public function setLibelle(string $libelle): static
    {
        $this->libelle = $libelle;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(?string $adresse): static
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getLongitude(): ?string
    {
        return $this->longitude;
    }

    public function setLongitude(?string $longitude): static
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getLatitude(): ?string
    {
        return $this->latitude;
    }

    public function setLatitude(?string $latitude): static
    {
        $this->latitude = $latitude;

        return $this;
    }

    /**
     * @return Collection
     */
    public function getInterventions(): Collection
    {
        return $this->interventions;
    }

    /**
     * @param Collection $interventions
     */
    public function setInterventions(Collection $interventions): void
    {
        $this->interventions = $interventions;
    }

    /**
     * @return Collection
     */
    public function getRecoltes(): Collection
    {
        return $this->recoltes;
    }

    /**
     * @param Collection $recoltes
     */
    public function setRecoltes(Collection $recoltes): void
    {
        $this->recoltes = $recoltes;
    }


}
