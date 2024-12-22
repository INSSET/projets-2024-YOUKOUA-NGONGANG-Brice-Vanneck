<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\RecolteRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(paginationMaximumItemsPerPage: 10,
    normalizationContext: ['groups' => ['intervention:read']],
    denormalizationContext: ['groups' => ['intervention:write']]),
    ApiFilter(SearchFilter::class,properties: ['ruche'=>'exact'])

]
#[ORM\Entity(repositoryClass: RecolteRepository::class)]
class Recolte
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['recolte:read', 'ruche:read'])]
    private ?int $id = null;

    #[Groups(['recolte:read', 'ruche:read'])]
    #[ORM\Column]
    private ?float $poids = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $created_at = null;

    #[ORM\ManyToOne(targetEntity: Ruche::class, inversedBy: 'recoltes')]
    private Ruche $ruche;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPoids(): ?float
    {
        return $this->poids;
    }

    public function setPoids(float $poids): static
    {
        $this->poids = $poids;

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

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(?\DateTimeInterface $created_at): static
    {
        $this->created_at = $created_at;

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
