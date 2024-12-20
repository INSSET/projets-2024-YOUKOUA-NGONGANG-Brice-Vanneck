<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\InterventionRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(paginationMaximumItemsPerPage: 10,
    normalizationContext: ['groups' => ['intervention:read']],
    denormalizationContext: ['groups' => ['intervention:write']]),
    ApiFilter(SearchFilter::class,properties: ['libelle'=>'partial','ruche'=>'exact'])

]
#[ORM\Entity(repositoryClass: InterventionRepository::class)]
class Intervention
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['intervention:read', 'ruche:read'])]
    private ?int $id = null;
    #[Groups(['intervention:read'])]
    #[ORM\Column(length: 255)]
    private ?string $libelle = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date = null;
    #[Groups(['intervention:read'])]
    #[ORM\ManyToOne(targetEntity: Ruche::class, inversedBy: 'interventions')]
    private Ruche $ruche;


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

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): static
    {
        $this->date = $date;

        return $this;
    }

    /**
     * @return Ruche
     */
    public function getRuche(): Ruche
    {
        return $this->ruche;
    }

    /**
     * @param Ruche $ruche
     */
    public function setRuche(Ruche $ruche): void
    {
        $this->ruche = $ruche;
    }

    



}
